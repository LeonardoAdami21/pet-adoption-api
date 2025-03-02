import { ApiProperty } from "@nestjs/swagger";

export class AprovePetDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    status: string;
}