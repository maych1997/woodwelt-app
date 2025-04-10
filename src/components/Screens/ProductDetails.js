import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFontIsto from 'react-native-vector-icons/Fontisto';
import RenderHTML from 'react-native-render-html';
import RelatedList from '../Product/RelatedList';
import Swiper from 'react-native-swiper';
import NextIcon from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';
import useCart from '../../../hooks/useCart';
import {useSelector} from 'react-redux';
const ProductDetails = ({route, navigation}) => {
  const {addToCart} = useCart();
  console.log(route);
  let product=route.params.route=='Cart'?route?.params?.productDetails:route?.params?.productDetails?.item;
  const cartLoad = useSelector(state => state.load.addToCartLoading);
  const collapsibles = [
    {
      name: 'sku',
      title: 'SKU',
    },
    {
      name: 'description',
      title: 'Description',
    },
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [variationProduct, setVariationProduct] = useState(null);
  const toggleCollapse = index => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle collapse
  };

  const [count, setCount] = useState(1);

  // Function to increment count
  const increment = () => setCount(count + 1);

  // Function to decrement count
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const images = [
    product?.image?.link, // Main image
    ...(product?.galleryImages?.nodes?.map(
      image => image?.link,
    ) || []), // Gallery images
  ];
  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'arrow-back-ios'} size={25}></Icon>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            padding: 10,
            gap: 10,
            flex: 1,
            paddingBottom: '10%',
          }}>
          <View style={{width: '100%', height: 400}}>
            {variationProduct == null ? (
              <Swiper
                prevButton={
                  <NextIcon
                    name={'leftcircle'}
                    color={'#f5cba7'}
                    size={35}></NextIcon>
                }
                nextButton={
                  <NextIcon
                    name={'rightcircle'}
                    color={'#f5cba7'}
                    size={35}></NextIcon>
                }
                activeDotColor="#FA6E49"
                horizontal
                scrollEnabled={true}
                showsButtons={true}>
                {images.map(item => {
                  return (
                    <Image
                      style={{
                        resizeMode: 'cover',
                        height: '100%',
                        width: 'auto',
                      }}
                      source={{
                        uri: item,
                      }}></Image>
                  );
                })}
              </Swiper>
            ) : (
              <>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: '100%',
                    width: 'auto',
                  }}
                  source={{
                    uri: variationProduct.image.link,
                  }}></Image>
              </>
            )}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 'auto',
              justifyContent: 'space-between',
            }}>
            {variationProduct != null ? (
              <Text style={{fontSize: 20, fontWeight: 800, width: '60%'}}>
                {variationProduct.name}
              </Text>
            ) : (
              <Text style={{fontSize: 20, fontWeight: 800, width: '60%'}}>
                {product?.name}
              </Text>
            )}
            <Text style={{fontSize: 20, fontWeight: 600}}>
              {product?.price?.replace(
                /&nbsp;/g,
                '',
              )}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              disabled={variationProduct==null && product?.type=='VARIABLE'?true:false}
              onPress={() => {
                if(product?.type=='VARIABLE'){
                  addToCart(variationProduct.databaseId, count);                  
                }else{
                  addToCart(product?.databaseId, count);
                }
              }}
              style={{
                padding: 8,
                backgroundColor: variationProduct==null && product?.type=='VARIABLE'?'#aab7b8':'#000',
                borderRadius: 5,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
              }}>
              {cartLoad ? (
                <ActivityIndicator
                  size={'small'}
                  color={'#fff'}
                  style={{padding: 1}}
                  animating={cartLoad}></ActivityIndicator>
              ) : (
                <Text style={{fontSize: 18, color: '#fff'}}>Add to Cart</Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '40%',
                alignItems: 'center',
                borderWidth: 1,
                backgroundColor: '#fff',
                borderRadius: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={decrement}
                style={{padding: 10, borderRightWidth: 1}}>
                <IconFontIsto name={'minus-a'} size={15} />
              </TouchableOpacity>

              <TextInput style={{fontSize: 20, fontWeight: 500}}>
                {count}
              </TextInput>
              <TouchableOpacity
                onPress={increment}
                style={{padding: 10, borderLeftWidth: 1}}>
                <IconFontIsto name={'plus-a'} size={15} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'column', width: 'auto'}}>
            {product?.attributes?.nodes?.map(
              item => {
                // console.log(item.options);
                return (
                  <>
                    <Text style={{fontSize: 18, fontWeight: 800, width: '60%'}}>
                      {item.label}
                    </Text>
                    <TouchableOpacity
                      style={{
                        display: variationProduct != null ? 'flex' : 'none',
                      }}
                      onPress={() => {
                        if (variationProduct != null) {
                          setVariationProduct(null);
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          width: '60%',
                          color: '#FA6E49',
                        }}>
                        Clear All
                      </Text>
                    </TouchableOpacity>
                    <FlatGrid
                      itemDimension={130}
                      data={
                        product?.variations?.nodes
                      } // Passing options as data to FlatGrid
                      renderItem={({item}) => {
                        // Destructuring the item prop to get individual options
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setVariationProduct(item);
                            }}
                            style={{
                              borderWidth:
                                variationProduct?.id === item.id ? 3 : 1,
                              padding: 5,
                              width: 'auto',
                              borderColor:
                                variationProduct?.id === item.id
                                  ? '#FA6E49'
                                  : '#000',
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 500,
                                width: '60%',
                              }}>
                              {String(item.attributes.nodes[0].value)
                                .replaceAll('-', ' ')
                                .toUpperCase()}
                            </Text>{' '}
                            // Adjust this based on the structure of option
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </>
                );
              },
            )}
          </View>
          {collapsibles.map((item, index) => {
            return (
              <>
                {product[item?.name] != undefined ||
                null ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        toggleCollapse(index);
                      }} // Toggle the current index
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#bdc3c7',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 20, fontWeight: 600}}>
                        {item.title}
                      </Text>
                      <IconFontIsto
                        name={
                          expandedIndex === index ? 'angle-up' : 'angle-down'
                        }
                        size={15}
                      />
                    </TouchableOpacity>
                    <Collapsible collapsed={expandedIndex !== index}>
                      <View style={{marginTop: 5}}>
                        {item.name == 'description' ? (
                          <RenderHTML
                            contentWidth={100}
                            source={{
                              html: product[
                                item?.name
                              ],
                            }}></RenderHTML>
                        ) : (
                          <Text style={{fontSize: 15, fontWeight: 600}}>
                            {product[item?.name]}
                          </Text>
                        )}
                      </View>
                    </Collapsible>
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
          {product?.related ? (
            <Text style={{fontSize: 25, fontWeight: '800'}}>
              Related Products
            </Text>
          ) : (
            <></>
          )}
          <RelatedList
            details={
              product?.related
            }></RelatedList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
