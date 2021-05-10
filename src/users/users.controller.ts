import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOkResponse({type:User,isArray:true})
    @ApiQuery({name:'name',required:false})
    @Get()
    getUsers(@Query('name') name:string): User[] {
        return this.userService.findAll(name);
    }

    @ApiOkResponse({type:User})
    @ApiNotFoundResponse()
    @Get(':id')
    getuserById(@Param('id',ParseIntPipe) id:number): User {
        
        const user = this.userService.findById(id)
        
        if(!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @ApiCreatedResponse({type:User})
    @ApiBadRequestResponse()
    @Post()
    createUser(@Body() body: CreateUserDto):User {
        return this.userService.createuser(body)
    }
}
