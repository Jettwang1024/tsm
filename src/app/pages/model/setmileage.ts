export interface Activity {
  actNumber: string;
  actName: string;
  setDate: Date | null; // 修改為 Date | null 類型
}
  
  export interface SetAct {
    actNumber: string;
    actName: string;
    productNumber: string;
    setDate: string;
    receiveDate: string;
    expiryDate: string;
    target: string;
  }