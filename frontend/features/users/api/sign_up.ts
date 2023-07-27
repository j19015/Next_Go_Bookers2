interface User{
  name: string;
  email: string;
  password: string;
}

export const sign_up=async(e :User)=>{
  try{
    
  }catch(e){
    console.error('エラーが発生しました:', e);
  }
}