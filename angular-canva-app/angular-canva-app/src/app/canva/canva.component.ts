import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, zip } from 'rxjs';

interface UploadedFile {
  name: string;
  src: string;
  image: HTMLImageElement;
}
@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.scss'],
})
export class CanvaComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  private fixedWidth = 620; // Fixed width for each image
  private fixedHeight = 200; // Fixed height for each image
  public fixedWidthPreview = 30; // Fixed width for each image
  public fixedHeightPreview = 30; // Fixed height for each image
  public uploadedImages: UploadedFile[] = [];

  ngOnInit() {}

  public uploadImg(event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file) => this.loadImage(file));
    }
  }
  private loadImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        this.uploadedImages.push({
          name: file.name,
          src: img.src,
          image: img,
        }); // Add the new image and its name to the list
        this.drawImages(); // Redraw all images on the canvas
      };
    };
    reader.readAsDataURL(file);
  }

  private drawImages(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const maxWidth = this.fixedWidth;
    const totalHeight = this.fixedHeight * this.uploadedImages.length;

    this.canvas.nativeElement.width = maxWidth;
    this.canvas.nativeElement.height = totalHeight;

    ctx.clearRect(0, 0, maxWidth, totalHeight); // Clear the canvas

    this.uploadedImages.forEach((file, index) => {
      const yOffset = index * this.fixedHeight;
      ctx.drawImage(
        file.image,
        0,
        0,
        file.image.width,
        file.image.height,
        0,
        yOffset,
        this.fixedWidth,
        this.fixedHeight
      );
    });
  }
}
