import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from '@firebase/storage';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(
    private galleryService: GalleryService,
    public loadingService: LoadingService
  ) {}
  cities: string[] = [];
  ocr: any[] = [];
  show = false;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    this.getOcrs();
  }

  async getOcrs() {
    const ocrs = await this.galleryService.getOcrs();
    ocrs.forEach((ocr) => {
      const { cities } = ocr.data();
      this.cities = cities;
    });
    this.getImagesByOcr();
  }

  async getImagesByOcr() {
    await Promise.all(
      this.cities.map(async (city) => {
        this.ocr.push({ city, urlImages: [] });
        const images = await this.galleryService.getImagesByOcr(city);
        this.loadingService.start();
        await Promise.all(
          images.items.map(async (item) => {
            const url = await getDownloadURL(item);
            this.setImage(city, { url });
          })
        );
      })
    );

    this.show = true;
    this.loadingService.end();
  }

  private setImage(city: string, url: any) {
    const imageCities = this.ocr.find((o) => o.city === city);
    imageCities.urlImages.push(url);
  }
}
