const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

const movableObjects = {};

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "squidge",
  password: "squidge",
  database: "socketdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
});
/*
function pingdb() {
    var sql_keep = `SELECT 1 + 1 AS solution`; 
    con.query(sql_keep, function (err, result) {
      if (err) throw err;
      console.log("Ping DB");
    });
  }
  setInterval(pingdb, 360000);
*/
io.on('connection', (socket) => {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    console.log('A user connected: ' + clientIp + ' ID' + socketId);

    //#2 for all - separately for now to sort later
    socket.on('reloadPage', () => {
        io.emit('reloadPage');
    });

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
    });

    socket.on('refreshPage', (data) => {
        io.to(data.roomName).emit('refreshPageNow', data);
        console.log("refreshPage->refreshPageNow: "+JSON.stringify(data));
    });



    socket.on('moveObject', (data) => {
        io.to(data.roomName).emit('objectMoved', data);
        console.log("moveObject->objectMoved: "+JSON.stringify(data));
    });
    


    socket.on('updatedraggableTextBox_TextBox_TONODE', (data) => {
        io.to(data.roomName).emit('updatedraggableTextBox_TextBox_FROMNODE', data);
        console.log("updatedraggableTextBox_TextBox_TONODE->updatedraggableTextBox_TextBox_FROMNODE: "+JSON.stringify(data));
    });
    socket.on('updatedraggableTextBox2_TextBox_TONODE', (data) => {
        io.to(data.roomName).emit('updatedraggableTextBox2_TextBox_FROMNODE', data);
        console.log("updatedraggableTextBox2_TextBox_TONODE->updatedraggableTextBox2_TextBox_FROMNODE: "+JSON.stringify(data));
    });
    socket.on('moveTextBox_TONODE', (data) => {
        io.to(data.roomName).emit('moveTextBox_FROMNODE', data);
        console.log("moveTextBox_TONODE->moveTextBox_FROMNODE: "+JSON.stringify(data));
    });
    socket.on('moveTextBox2_TONODE', (data) => {
        io.to(data.roomName).emit('moveTextBox2_FROMNODE', data);
        console.log("moveTextBox2_TONODE->moveTextBox2_FROMNODE: "+JSON.stringify(data));
    });

    socket.on('createObject', (data) => {
        io.to(data.roomName).emit('objectCreated', data);
    });

    socket.on('deleteObject', (data) => {
      io.to(data.roomName).emit('objectDeleted', data);
      console.log("deleteObject->objectDeleted: "+JSON.stringify(data));
    });

    socket.on('changeImage', (data) => {
      io.to(data.roomName).emit('imageChanged', data);
      console.log("changeImage->imageChanged: "+JSON.stringify(data));
    });

    socket.on('changeSize', (data) => {
      io.to(data.roomName).emit('sizeChanged', data);
      console.log("changeSize->sizeChanged: "+JSON.stringify(data));
    });
    // rotate (2)
    socket.on('rotateObject', (data) => {
        io.to(data.roomName).emit('changeRotate', data);
        console.log("rotateObject->changeRotate: "+JSON.stringify(data));
    });
    // NEXT STEP ON HTML (EXAMPLE 3)
    socket.on('flipChanged', (data) => {
        io.to(data.roomName).emit('changeFlip', data);
        console.log('flipObject->changeFlip '+JSON.stringify(data));
    });

    // Update the server-side code to handle opacity changes
    socket.on('opacityChanged', (data) => {
        io.to(data.roomName).emit('changeOpacity', data);
        console.log('opacityChanged->changeOpacity '+JSON.stringify(data));
    });

    socket.on('zindexChanged', (data) => {
        io.to(data.roomName).emit('changezIndex', data);
        console.log('zindexChanged->changeZIndex '+JSON.stringify(data));
    });

    //////////////////// FILTERS //////////////////////////
    socket.on('blurChanged', (data) => {
        io.to(data.roomName).emit('changeBlur', data);
        console.log('blurChanged->changeBlur '+JSON.stringify(data));
    });

    socket.on('brightnessChanged', (data) => {
        io.to(data.roomName).emit('changeBrightness', data);
        console.log('brightnessChanged->changeBrightness '+JSON.stringify(data));
    });

    socket.on('grayscaleChanged', (data) => {
        io.to(data.roomName).emit('changeGrayscale', data);
        console.log('grayscaleChanged->changeGayscale '+JSON.stringify(data));
    });

    socket.on('hueChanged', (data) => {
        io.to(data.roomName).emit('changeHue', data);
        console.log('hueChanged->changeHue '+JSON.stringify(data));
    });

    socket.on('sepiaChanged', (data) => {
        io.to(data.roomName).emit('changeSepia', data);
        console.log('sepiaChanged->changeSepia '+JSON.stringify(data));
    });

    socket.on('invertChanged', (data) => {
        io.to(data.roomName).emit('changeInvert', data);
        console.log('invertChanged->changeInvert '+JSON.stringify(data));
    });

    socket.on('saturateChanged', (data) => {
        io.to(data.roomName).emit('changeSaturate', data);
        console.log('saturateChanged->changeSaturate '+JSON.stringify(data));
    });

    socket.on('contrastChanged', (data) => {
        io.to(data.roomName).emit('changeContrast', data);
        console.log('contrastChanged->changeContrast '+JSON.stringify(data));
    });

    socket.on('wtpChanged', (data) => {
        io.to(data.roomName).emit('changeWtp', data);
        console.log('wtpChanged->changeWtp '+JSON.stringify(data));
    });

    socket.on('wtpRevealChanged', (data) => {
        io.to(data.roomName).emit('changeRevealWtp', data);
        console.log('wtpRevealChanged->changeRevealWtp '+JSON.stringify(data));
    });

    ///////////////////////////////////////////////////
    socket.on('playObject', (data) => {
        io.to(data.roomName).emit('playthisObject', data);
        console.log('playObject->playthisObject '+JSON.stringify(data));
    });
    socket.on('pauseObject', (data) => {
        io.to(data.roomName).emit('pausethisObject', data);
        console.log('pauseObject->pausethisObject '+JSON.stringify(data));
    });
    socket.on('stopObject', (data) => {
        io.to(data.roomName).emit('stopthisObject', data);
        console.log('stopObject->stopthisObject '+JSON.stringify(data));
    });
    socket.on('volumeObject', (data) => {
        io.to(data.roomName).emit('volumethisObject', data);
        console.log('volumeObject->volumethisObject '+JSON.stringify(data));
    });
    socket.on('textObject', (data) => {
        io.to(data.roomName).emit('textthisObject', data);
        console.log('textObject->textthisObject '+JSON.stringify(data));
    });
    




    socket.on('saveObjectstoDBtoNODEJS', (data) => {
        //io.to(data.roomName).emit('saveObjectstoDBtoNODEJS', data);
        //sql = "INSERT INTO objects (url, x, y, zindex, opacity, rotate, flip, volume, objectgroupname, objectname, width, height) ";
        //sql += "";
        //console.log('saveObjectstoDBtoNODEJS '+JSON.stringify(data));
        duhsql = data.sql;
        console.log(duhsql);
        con.query(duhsql, function (err, result) {
            if (err) throw err;
            console.log("Record inserted"+duhsql);
        });
    
    });
    
    socket.on('deleteSqlObjects', (data) => {
        //io.to(data.roomName).emit('saveObjectstoDBtoNODEJS', data);
        
        //var dropsql = "DROP TABLE objects";
        //con.query(dropsql, function (err, result) {
        //    //if (err) throw err;
        //    console.log("table dropped");
        //});


        //var sql = "CREATE TABLE objects (id int NOT NULL AUTO_INCREMENT, url varchar(1000) NOT NULL, x decimal(5,0) NOT NULL, y decimal(5,0) NOT NULL, zindex decimal(5,0) DEFAULT NULL, opacity varchar(5) DEFAULT NULL, rotate varchar(10) DEFAULT NULL, flip decimal(5,0) DEFAULT NULL, volume decimal(2,2) DEFAULT NULL, objectgroupname varchar(100) DEFAULT NULL, objectname varchar(150) DEFAULT NULL, width decimal(5,0) DEFAULT NULL, height decimal(5,0) DEFAULT NULL, PRIMARY KEY (id) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='default objects database for socket io')";
        
        //console.log('deleteSqlObjects '+JSON.stringify(data));
        sql = `DELETE FROM objects WHERE id >= 0`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Records deleted");
        });
        sql = `ALTER TABLE objects AUTO_INCREMENT = 0`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("ALTER TABLE objects AUTO_INCREMENT = 0");
        });
    
    });
    /*socket.on('createDBObjectsTONODE', (data) => {

        sql = `SELECT * FROM objects`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log("Read results in DB - Creating:");
            for(i=0; i<=result.length; i++){
                io.to(data.roomName).emit('createDBObjectsFROMNODE', result[i]);
            }
        });
    
    });*/
    socket.on('createDBObjectsTONODE', (data) => {

        sql = `SELECT * FROM objects`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            
            
                console.log("---> createDBObjectsTONODE --->");
                //console.log(result);
                //delayInMilliseconds = i*100;
                delayInMilliseconds = 300;
                setTimeout(function() {
                    console.log(result);
                    io.to(data.roomName).emit('createDBObjectsFROMNODE', result);
                }, delayInMilliseconds);
            
        });
    
    });
    

    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + clientIp + ' ID ' + socketId);
      });
  
  
  
  });
  
  
  const PORT = process.env.PORT || 80;
  server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  
  




