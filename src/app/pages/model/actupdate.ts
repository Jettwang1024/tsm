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
  receivingStartDate: string;
  receivingEndDate: string;
  expiryStartDate: string;
  expiryEndDate: string;
  imageName: string;
  targetAudience: string;
  description: string;
  imageFile: string;
  targetBySerial: boolean;
  targetBySystem: boolean;
  testCheckbox: boolean;
  memberStatus: string;
}
