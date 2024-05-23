const express = require('express');
const ControllerUser = require('./controllers/controllerUser');
const ControllerAdmin = require('./controllers/controllerAdmin');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', ControllerUser.home);
app.get('/tickets/:id', ControllerUser.detailTicket);
app.post('/tickets/:id/take', ControllerUser.takeTicket); // Tambahkan rute untuk mengambil tiket
app.get('/transactions', ControllerUser.allTransactions);
app.get('/transaksi/beli-invoice', ControllerUser.beliDanBuatInvoice);


app.get('/admin/tickets', ControllerAdmin.adminHome);
app.get('/admin/tickets/add', ControllerAdmin.addTicketForm);
app.post('/admin/tickets/add', ControllerAdmin.addTicket);
app.get('/admin/tickets/:id/edit', ControllerAdmin.editTicketForm);
app.post('/admin/tickets/:id/edit', ControllerAdmin.editTicket);
app.post('/admin/tickets/:id/delete', ControllerAdmin.deleteTicket);

app.get('/login', ControllerAdmin.loginPage)
app.get('/signup', ControllerAdmin.signupPage)
app.post('/validateAccount', ControllerAdmin.validateAccount)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
