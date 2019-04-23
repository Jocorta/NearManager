import  axios  from "axios";

const url = 'http://localhost:8081/api/users'

class UserService{
    //Get User
    static getUsers(){
        return new Promise(async(resolve, reject) => {
            try{
                const res = await axios.get(url)
                const data = res.data
                resolve(
                    data.map(user => ({
                        ...user,
                        createdAT: new Date(user.createdAT)
                    }))
                )
            }
            catch(err){
                reject(err)
            }
        })
    }

    //Create User

    //Delete User
}