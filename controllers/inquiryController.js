import { isItCustomer } from "./userController.js";

export async function addInquiry(req,res)
{
   try{

    if (isItCustomer(req)) {
        const data = req.body
        data.email = req.user.email
        data.phone = req.user.phone

        // i am sleep
    }

   } catch(e){
    res.status(500).json({
        message: 'Error while adding inquiry',
    })
   }
}