export interface Actupdate {
    id: string;
    memberNumber: string;
    memberName: string;
    birthday: string;
    region: string;
    mobilePhone: string;
    registrationUnit: string;
    registrationDate: string;
    lastLoginDate: string;
    memberStatus: string;
    totalSpent: string;
  }
  
  export interface Actupdatetable {
    activityNumber: string;
    activityName: string;
    mileage: string;
    productNumber: string;
    postingDate: string;
    receivingStartDate: string;  // 新增起始日期字段
    receivingEndDate: string;    // 新增结束日期字段
    expiryStartDate: string;     // 新增起始日期字段
    expiryEndDate: string;       // 新增结束日期字段
    imageName: string;
    targetAudience: string;
    description: string;
    imageFile: string;
    targetBySerial: boolean;
    targetBySystem: boolean;
    testCheckbox: boolean;
  }