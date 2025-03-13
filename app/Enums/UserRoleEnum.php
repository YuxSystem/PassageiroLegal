<?php

namespace App\Enums;

/**
 *
 */
enum UserRoleEnum: string
{
    case ADMIN = 'Admin';
    case EMPLOYEE = 'Employee';
    case USER = 'User';

}
