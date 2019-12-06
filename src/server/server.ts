import express = require ('express');
import path = require('path');
import morgan = require ('morgan');
import {authentication} from '../../../ecommerce-security/src/middlewares/authentication.mdd'
import {midwSingIn} from '../../../ecommerce-security/src/controllers/singin/midwSingIn';
import {midwSingUp} from '../../../ecommerce-security/src/controllers/singUp/midwSingUp';
import {singInController} from '../../../ecommerce-security/src/controllers/singin/singInController';
import {singUpController} from '../../../ecommerce-security/src/controllers/singUp/singUpController';
import {midwProductsList} from '../../../ecommerce-core/src/controllers/producslist/midwProductsList';
import {productsListController} from '../../../ecommerce-core/src/controllers/producslist/listProducts.controller';

const {mongoose} = require ('../../../ecommerce-core/src/mongoDbConfig');


export default class Server{
  public app: express.Application;
  public portNumber : Number | String;

  constructor (private port?: Number |String){
      
      this.app = express();
      this.settings();
      this.portNumber = this.app.get('port');
      this.middlewares();
      this.routes();
  }
  
  settings (){
     this.app.set('port', this.port || process.env.PORT || 3000);
  }

  middlewares(){
      this.app.use(morgan('dev'));
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended:false}));
      this.app.use(authentication);
      
  }
  
  routes(){
    this.app.use('/singin',midwSingIn,singInController);
    this.app.use('/singup',midwSingUp,singUpController);
    this.app.use('/productslist',midwProductsList,productsListController);
    
  }
  
  private publicFolder(){
      //const publicPath = path.resolve(__dirname,'../public');
      const publicPath = path.resolve(__dirname,'../../../ecommerce-web/dist/public');
      console.log('Public: ',publicPath);
      this.app.use(express.static(publicPath));
  }

  async start(){
      this.app.listen(this.portNumber);
      this.publicFolder();
      console.log(`Nodejs Server started - Port number: ${this.portNumber}`);      
  }
}
