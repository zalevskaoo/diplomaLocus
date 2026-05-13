export class CreatePointDto {
  title!: string;
  category!: string;
  address!: string;
  description?: string;
  latitude!: number;
  longitude!: number;
}