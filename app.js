const  express = require('express');
const mysql = require('mysql');
const hbs =  require('hbs');
const bodyParser = require('body-parser');

const  app = express();
const port = 9000;
// setting engine view hbs
app.set('view engine', 'hbs');

// setting parser data dari mysql ke appjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var koneksi =  mysql.createConnection({
   host: 'localhost',
   user: 'rizal',
   password: '0000',
   database: 'my_todo'
});

koneksi.connect((err) => {
   if(err) throw err;
   console.log("Koneksi Database Berhasil tersambung yaa");
});

app.get('/', (req, res) => {
   koneksi.query('SELECT * FROM aktivitas', (err, hasil) => {
    if(err) throw err;
    res.render('home.hbs', {
        terserah: 'MY TODO',
        data: hasil
      });
   });
});

app.post('/tambahbarang', (req, res) => {
  var detailkegiatan = req.body.inputdetailkegiatan;
  var tanggal = req.body.inputtanggal;

  koneksi.query('INSERT INTO aktivitas(detail_kegiatan, tanggal) VALUES(?, ?)',
        [ detailkegiatan, tanggal ],
            (err, hasil) => {
                if(err) throw err;
                res.redirect('/');
                }
          )
});
app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
})