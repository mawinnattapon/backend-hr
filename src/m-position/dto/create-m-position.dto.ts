import { IsNotEmpty } from "class-validator";

export class CreateMPositionDto {
    @IsNotEmpty()
    posName: string;

    @IsNotEmpty()
    isActive: boolean;
}
