const http = require('http');
const fs = require('fs');

let student_data;




const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Types', 'text/html');


    if(req.url === '/' && req.method === "GET") {

        fs.readFile("./registration.html", "utf-8", (err, data) => {
            if(err) throw err;
             res.end(data)
    })

    

}
else if(req.url === '/registration' && req.method === "POST") {
    let body = "";
    req.on('data', (data) => {
        body += data;
        
    })

    req.on('end', () => {
        console.log(JSON.parse(body))
        fs.readFile("./registration.json", "utf-8", (err, data) => {
            if(err) throw err;
            let converting_data = JSON.parse(data);

            let convert_body = JSON.parse(body);
            console.log('hahahahaha',convert_body)
            converting_data[convert_body.username] = convert_body;
            converting_data = JSON.stringify(converting_data);
           
            fs.writeFile("./registration.json", converting_data, () => {
                console.log("file was writting")
                res.end(JSON.stringify({status: 0}))
            })
        })

    })
    
   }

   else if(req.url === '/login' && req.method === "GET") {
       fs.readFile('./login.html', 'utf-8', (err, data) => {
        res.end(data);
    })
    }

    else if(req.url === '/login' && req.method === "POST") {
        let databody = "";
        req.on('data', (data) => {
            databody += data;
        })
        req.on('end', () => {
            fs.readFile('./registration.json', 'utf-8', (err, data) => {
                let regFileData = JSON.parse(data);
                
                let logindatabody = JSON.parse(databody);
                
                let usernamedata = logindatabody.username;
                student_data = regFileData[usernamedata];
                if (student_data) {
                    if(regFileData[usernamedata].password === logindatabody.password) {
                        res.end(JSON.stringify({msg: 'password correct'}))
                    }else {
                        res.end(JSON.stringify({msg: 'password is not correct'}))
                        res.end(JSON.stringify({msg: 'Please enter your password again'}))
                    }
                }else {
                    res.end(JSON.stringify({msg: 'Not Found'}))
                }

            }) 
        })
    }
   
   
   else if(req.url === '/profile' && req.method === "GET") {
        fs.readFile('./profile.html', 'utf-8', (err, data) => {
            if(err) throw err;
            res.end(data);
        })  
       
    }
    else if (req.url === '/profile_student_name' && req.method === "GET"){
        // let json_information_names = student_data;
        res.end(JSON.stringify({student_data}))
    }


})

server.listen(3100, () => {
    console.log("server listening on port 3100")
})