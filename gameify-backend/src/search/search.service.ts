import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ProductsProposed } from 'src/product/res/products.proposed';

@Injectable()
export class SearchService {
    constructor(private readonly httpService: HttpService) {}
    
    async searchProductByName(
        productName: string,
      ): Promise<ProductsProposed[]> {
        const searchProducts = await this.httpService.axiosRef.get(
            `https://www.g2a.com/search/api/v3/suggestions?include\[\]=categories&itemsPerPage=5&phrase=${productName}&currency=PLN`,
          );
      
          const result = searchProducts.data.data.items.map((product) => {
            const productTitle = product.name;
            const productImg = product.image?.sources[7]?.url;
            const slug = product.slug;
      
            return {
              productTitle,
              productImg,
              slug,
            };
          });
          return result;
      }
}
