import { Module } from '@nestjs/common';
import { XmltreeService } from './xmltree.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [XmltreeService],
  imports: [HttpModule],
  exports: [XmltreeService],
})
export class XmltreeModule {}
