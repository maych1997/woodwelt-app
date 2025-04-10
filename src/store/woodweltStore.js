// store.js
import { useQuery } from '@apollo/client';
import { makeAutoObservable } from 'mobx';
import { FIELDS } from '../../Graphql/query';

class WoodWeltStore {
    categories = [];
    featuredProducts=[];
    scrollY = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setScrollY(value) {
    this.scrollY = value;
  }

  
  // async setFields() {
  //   this.loading = true;
  //   this.error = null;
  //   try {
  //     const response = await this.apolloClient.query({
  //       query: FIELDS, // your GraphQL query
  //     });
  //     this.categories = response.data; // Assuming the data structure contains categories
  //     console.log(response.data);
  //   } catch (error) {
  //     this.error = error.message;
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  async setFeaturedProducts() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch("https://woodwelt.eu/wp-json/wp/v2/product?featured=true");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      this.featuredProducts=data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}


const woodweltStore = new WoodWeltStore();
export default woodweltStore;
