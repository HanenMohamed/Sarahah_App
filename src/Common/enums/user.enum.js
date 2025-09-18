
export const GenderEnum={
    MALE:"male",
    FEMALE:"female",

}

export const RoleEnum={
    ADMIN:"admin",
    USER:"user",
    SUPER_ADMIN:"super_admin"
}

export const Privileges={
    ADMINS:[RoleEnum.ADMIN,RoleEnum.SUPER_ADMIN],
    SUPER_ADMIN:[RoleEnum.SUPER_ADMIN],
    ADMIN:[RoleEnum.ADMIN],
    USER:[RoleEnum.USER],
    ALL:[RoleEnum.ADMIN,RoleEnum.SUPER_ADMIN,RoleEnum.USER],
    USER_ADMIN:[RoleEnum.ADMIN,RoleEnum.USER],
    USER_SUPER_ADMIN:[RoleEnum.SUPER_ADMIN,RoleEnum.USER],
    
}

export const SkillLevelEnum={
    BEGINNER:"beginner",
    INTERMEDIATE:"intermediate",
    ADVANCED:"advanced",
    EXPERT:"expert"
}