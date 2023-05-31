import { Controller, Get, Query } from '@nestjs/common';
import { ItemQuery } from '../product/dto/search.itemQuery.dto';
import { ProductsProposed } from '../product/res/products.proposed';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async searchProducts(@Query() query: ItemQuery): Promise<ProductsProposed[]> {
      return await this.searchService.searchProductByName(query.itemName);
    }
}
