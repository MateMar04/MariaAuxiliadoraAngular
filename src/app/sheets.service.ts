import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Equipo} from "./models/equipo";
import {Puntaje} from "./models/puntajes";
import {GSheet} from "./models/gsheet";

declare var google: any;

const CLIENT_ID = '493427967009-jh0thlsnfauud0k8r8v35mvb6bd1ccj8.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor() {
  }

  client: any;
  token_expiration: Date = new Date();
  token_response: any = {expires_in: 0};
  authenticating: boolean = false;

  private tokenExpired(): boolean {
    return new Date() >= this.token_expiration
  }

  private authenticate<T>(getter: () => T): Observable<T> {
    return new Observable<T>(observable => {
      if (this.tokenExpired()) {
        this.authenticating = true;
        this.client = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPE,
          callback: (tokenResponse: any) => {
            this.token_response = tokenResponse;
            let now = new Date();
            now.setSeconds(now.getSeconds() + (tokenResponse.expires_in - 10));
            this.token_expiration = now;
            this.authenticating = false;
            observable.next(getter());
          },
        });
        this.client.requestAccessToken();
      } else {
        observable.next(getter());
      }
    });
  }

  private static toEntities<T>(gsheet: GSheet, mapper: (v: string[]) => T): T[] {
    return gsheet.values.slice(1).map(mapper)
  }

  getEquipos(): Observable<Equipo[]> {
    return this.authenticate(() => this.loadEntities("%27Equipos%27!A1%3AD33", v => new Equipo(v)));
    /*
        return of(this.toEquipos({
            majorDimension: "", range: "",
            "values": [
              [
                "PAIS",
                "EMBAJADOR",
                "PILOTO",
                "EQUIPO"
              ],
              [
                "ALEMANIA",
                "Ethel Gigena",
                "Gustavo Manassero",
                "Galvez Thiago Ezequiel\nPaez Felipe Gabriel\nCorallo Margosian Maximo\nBorghello Genaro Ra??l\nLopresti Maximo\nRuiz Manso Pedro\nCardo Ramiro\nZarazaga Valent??n\nGonzo Mart??n Benjam??n\nPedone Lopez Faustino Camilo\nMoesch Santino\nMarcantonelli Monferran Mateo\nGuerra Sandes Franchesco Agustin\nD??az Garc??a M??ximo Ezequiel\nPagliettini Tomas\nPucheta Noguera Antonio\nJuri Lenard??n Alejandro Augusto\nDaveloze Bautista\nPepi Leon Martin"
              ],
              [
                "ARABIA SAUDITA",
                "Diego Porrini",
                "",
                "Mart??n, Maximiliano\nGonzo Mart??n, Tom??s\nMercado Gurdulich, Facundo\nC??rdoba, Juan Ignacio\nSalamone Gonzalez, Santino\nJurado Villena, Lorenzo Adri??n\nBrezzo Francisco Miguel\nRomera, Matias Daniel\nGalaverna Lorenzo\nVicente, Bruno\nAndino Sosa Guillermo Gustavo\nFillol Ballesteros , Ignacio Agustin\nEtcheverry Soto, Mat??as\nSpinosa, Augusto Luis\nTorres Fatala, Nazareno\nOliveros Gigena, Joaqu??n\nRaviolo, Mateo"
              ],
              [
                "ARGENTINA",
                "Federico Ferraro",
                "El??as Bulacio",
                "Boiko, Federico\nAbril Perrig, Teo Nicolas\nSessarego, Santino\nBlazquez Maximo Tom??s\nFerrario, Santiago\nMartino, Nahuel Gabriel\nCampos, Benjamin Augusto\nRolleri Valentino Filippo\nMontini Carrillo, Francisco Bautista\nDi Tomaso Fabricio Guido\nMorero, Guido Martin\nZartarian Boetto, Pedro\nMoya Santucho, Atila Le??n\nFerro Agust??n\nMiranda Mateo\nEtchechoury, Luca\nPurro, Ezequiel"
              ],
              [
                "BELGICA",
                "Eugenia Hazebrouck",
                "",
                "Malap Lucciano\nButeler Clari?? Mateo\nEspa??on Bautista\nAngelelli Facundo\nCastellano Musotto Joaquin\nSalatin Francisco\nNeira Santiago\nCantarelli Carrara Tom??s Alejandro\nKunda Leandro Emmanuel\nPereyra Santiago Joaquin\nCanosa Alejandro Luis\nCortez Espinosa Juan Cruz\nMancuso Adriano\nMendoza Velez Fausto\nPerea Bruno\nBarrag??n Tom??s\nCariola Marcelo Reynaldo\nBornancini Ignacio Salvador\nApra Tomas"
              ],
              [
                "BRASIL",
                "Gustavo Funes",
                "",
                "Cherini Isidoro Oscar Manuel\nCastro Rolando Mateo El??as\nPonce Neumann Jos?? Lucas\nGraziano, Tom??s\nVaquero, Alejo\nBuffaz Santiago\nOviedo Arrieta, Santiago Joaquin\nMurua Grafinger, Luciano\nVelez Lautaro Mat??as\nVago Grecco, Fernando Mateo\nGhione Pedernera, Valentino\nMarioli, Emiliano\nBarbini Molluso, Matteo David\nFregonese, Benjamin\nSadukas, Federico\nGauna Roman Ross, Ignacio A.\nChudnosky Joaqu??n Ignacio"
              ],
              [
                "CAMERUN",
                "Juan Pablo Carta",
                "Lautaro Oliva",
                "Mendez, Lautaro Emiliano\nTanus, Santiago Daniel\nCutri, Lorenzo\nIrisarri, Lautaro\nLuna Tom??s Ernesto\nCavalli Barrera, Agust??n\nFunes Facundo Yair\nHeredia, Lionel Agustin\nFerreyra, Santiago Jos??\nMart??nez Luque Maximiliano Rafael\nLagger Octavio\nGarc??a Lucas Juli??n\nCuretti, Lucas Omar\nLitrenta, Marco Ignacio\nBarinboim, Ezequiel\nZangara R??ffer, M??ximo"
              ],
              [
                "CANADA",
                "Nicolas Sponton",
                "Jose Cargnelutti",
                "Olivero Nicolas Ezequiel\nFerrero Ignacio Emanuel\nArmesto Abba Felipe\nBatta??no Felipe\nFlores Cecchin Angel Joaquin\nMihaic Mateo\nVirgolini Facundo Ezequiel\nPonce Bracamonte Samuel Alexis\nMeighorner Casas Lucio Alberto\nTiberti Francisco Nicol??s\nLescano Tadeo\nCristiani Santino\nBeauge Pedro\nSibona Octavio\nGaido Tanquia Ramiro Nicolas\nJuarez Acevedo Lionel\nCarrera Matias Daniel\nSferco Marat\nCorrea Genaro Agustin"
              ],
              [
                "COLOMBIA",
                "Monica Flores",
                "Facundo Giordano ",
                "Peralta Marques Juan Manuel\nChiapero Francisco\nLastra Flores Tom??s Agust??n\nPavan Tomas Agustin\nRodriguez Martin Nicolas\nAlladio Lautaro Agust??n\nVacca Antonio\nBalmaceda Emanuel Ignacio\nZunino Mateo\nBodereau Fox Bautista\nPaez Gonzalo\nBanegas Ignacio Joaquin\nFredes Carana Santino David\nAradas Renzo\nGuchea Lezama Le??n\nBonanate Rubiolo Pedro\nMart??nez Nicol??s Ezequiel\nVoltolini G??mez Conrado Nicol??s\nArmando Baldassa Franco"
              ],
              [
                "COREA",
                "Gabriel Mu??oz",
                "Cassavechia Franco",
                "Gonzalez Zar Tobias\nFerro Gino Danilo\nFerrazzuolo Niza Benjam??n\nGiraudo Franco\nBernat Maggi Matias Eduardo\nCarreras Elkin Facundo Miguel\nGorosito Armoa Nicol??s\nFlores Tifner Lisandro\nPerco Romero Joaquin\nBruno Bernardis Lorenzo\nBoiko Pedro Benjam??n\nAguirre Lopez Felipe\nPuga Joaquin\nLoza Marcos Emilio\nBerz??n M??rquez Theo\nMargaria Smith Ramiro\nGonzalez Bossi Benjamin\nOlmedo Valentino Mateo\nCasavecchia Barrera Tom??s Ignacio\nMusso Blua Juan Ignacio"
              ],
              [
                "CROACIA",
                "Guillermo Bustos",
                "",
                "Cabral Bel??n Luciano\nCandiotto Luca\nJerez Halabi Ignacio\nMedina Lucini Facundo\nConejero Martinez Francisco Emanuel\nLedesma Magnien Matias\nGaray Allasia Santiago\nMiranda Franco\nRamos Panzeri Jeronimo\nNu??ez Tomas Santino\nLeones Gast??n\nTello Altamirano Feliciano\nCandiotto Gino\nMarzo Brasca Santino\nEspil Federico De Dios\nGarc??a Oviedo Jer??nimo Jos??\nEsca??uela Cisterna Mateo\nMartin Santiago\nCastillo Franco Ignacio"
              ],
              [
                "DINAMARCA",
                "Ruben Arce",
                "",
                "Laporte Le??n\nRizzi Constantino\nMenem Mateo Agust??n\nPastorino Joaquin Nicolas\nPaez Scruzzi Octavio\nMacias Luciano Nicolas\nCerri Valent??n Rafael\nCollino Tom??s Pietro\nGrimas Lautaro Nicol??s\nDel Gesso Nepote Pedro\nCarrera Sebastian Nicolas\nIrigo Sibilla Ignacio\nIvanovich Jose\nMartinez Jarchum Lautaro Benjamin\nGeorgetti Mateo\nSodero Juan Jose\nBazan Moyano Mateo Benjam??n\nVivas Gonella Francisco\nMiscevich Ivo"
              ],
              [
                "ECUADOR",
                "Juan Fernandez",
                "Fabricio Zuliani",
                "Salonia Agust??n Jos??\nMartinez Jarchum, Gonzalo Nicolas\nP??rraga, Joaqu??n Valentino\nBustamante, Ignacio Benjam??n\nSagray, Agustin\nPapi, Mateo\nAldasoro Gonz??lez Joaqu??n Enrique\nMendez, Fabricio Ezequiel\nCarranza Santiago\nSanram??, Lucas Andr??\nAndrada Garcia, David Elian\nSeidel, Santino\nBustos Gaspar\nSalatin, Thomas\nPeralta, Lucio\nMarrone, Fabrizio"
              ],
              [
                "EGIPTO",
                "Pablo Crivello",
                "Santiago Cagliero",
                "Palacios Agosto Lorenzo\nSponton Lautaro Ezequiel\nAlvarez Juan Cruz\nAtecas Raspanti Tobias\nVago Grecco Ignacio Daniel\nPrinzi Franco Ariel\nMordcovich Bautista\nVillegas Lucas Martin\nSegura Marsal Bruno Angel\nLigato Benicio\nGiraudo Juan Ignacio\nCarranza Gl??ck Tom??s\nGutierrez Bautista\nVerzino Mateo\nSibona Luciano\nRivilli Martos Alessio\nBorrione Tomas Ezequiel\nBoboskich Pailler Santino\nFacta Bautista\nBerbotto Benjam??n"
              ],
              [
                "ESPA??A",
                "Magdalena Buldrini",
                "Agustin Odetti",
                "Wap??arsky Jeremias\nValdez Saleme Facundo\nOperto Tomas\nPereyra Laxague Ignacio Reyes\nVega Federico Francisco\nBenavidez Lautaro\nLopez Cruz Benjam??n\nAlbert Anzolini Bruno\nCuret Varetto Juan Cruz\nBaravalle Bautista\nBono Santino Nicol??s\nNicolodi Marcos Ernesto\nBouza Casas M??ximo Emanuel\nCirrincione Bo Lorenzo\nCarot Agustin\nBerteli Tarquini Benjam??n\nBartolucci Gennaro\nPalacios Rodrigo Ezequiel\nBoisseau Juan Cruz\nVirgolini Santiago Agust??n"
              ],
              [
                "ESTADOS UNIDOS",
                "Nani Lopez",
                "Franco Cometto",
                "Passadore Agustin\nDi Pasquantonio Mateo\nFerrero Lorenzo\nLamberghini Nicklison Felipe\nCarranza Benjamin Gabriel\nRaviolo Juan Ignacio\nBorgiattino Facundo Ignacio\nArrieta Juan Pablo\nWeiss Olivieri Sebastian\nLedesma Santiago\nFaule Felipe\nVercellone Pedro Argentino\nEchepare Rivas Juan Cruz\nDi Tella Buttigliengo Luca\nDiaz Cornejo Lucio\nSuescun Rebollo Bruno Fabrizzio\nGauna Ferreyra Ignacio Agustin\nAcosta Pinto Ivan Ignacio\nSecchi Enzo Rom??n\n"
              ],
              [
                "FRANCIA",
                "Jesus Vila",
                "Tomas Perona",
                "Paolinelli Luciano Vito\nSpalla, Octavio\nB??hler, Octavio Ernesto\nRomero Ignacio\nPaz, Agustin\nCarranza, Jose Ignacio\nArmesto Abba, Ignacio\nL??pez De Alda, Luciano\nFieroli, Joaqu??n\nS??nchez, Mat??as Alejo\nMartin Rodrigo, Santiago\nUrtubey Jos?? Agust??n\nBenegas Prado, Lautaro\nDe La Fuente, Juan Ignacio\nL??pez Fabre Manuel\nCastro Chesini, Marcos Alejandro\nHlavach, Joaqu??n"
              ],
              [
                "GHANA",
                "Hernan Martinez",
                "Mateo Marchisone",
                "Di Tomaso Mauro Guillermo\nPeralta Facundo\nOliva Sosa Tiago Lautaro\nTu??on Agustin\nGenga Liendo Juan Ignacio\nCarreras Eugenio\nEstepovoy Novak\nRodriguez Planells Oviedo Ignacio\nArias Felipe M??ximo\nFarah Juan Ignacio\nPaz Joaquin\nLondero Agostinelli Facundo\nBianchini Francisco Andr??s\nFerro Bautista\n??rbol Ramiro\nBigo Pereyra Facundo Tomas\nBenegas Prado Bautista\nBelardinelli Franco\nButtazzoni Sol??s Tom??s Francisco"
              ],
              [
                "HOLANDA",
                "Juan Frattin",
                "David Quiroga",
                "Cruz Figueroa Jose\nSquinobal Lucero Joaqu??n\nMargaria Smith Valentino\nMartos Renato\nMoya Federico Nicol??s\nMuttigliengo Bautista\nZamora Papanicolau Santiago\nCorti Paredes Ezequiel Maximiliano\nLedesma Magnien Gabriel\nBrocal Bernasconi Mateo\nTisano Pacciaroni Fabrizio\nLudue??a De Melo Alejandro\nPereyra Manuel\nRighetti Martino\nDesmar??s Juan Cruz\nScarlato Garcia Juan Cruz\nMelgarejo Marcato Alvaro\nGatto Acosta Juan Cruz\nCordoba Manuel\nManfredini Santino\n"
              ],
              [
                "INGLATERRA",
                "Elisa Romero",
                "",
                "Femayor, Tom??s Lorenzo\nAsis, Tomas\nCassina Gaudiano Marcos Nicol??s\nRavetti Voget, Mateo Carlos\nCantarelli Carrara, Juan Cruz\nGonzalez Murina, Francisco\nBustamante Valenzuela, Joaqu??n\nPagani, Nicolas\nFerreyra, Octavio Nicolas\nLlanos, Maximo Martin\nLoza Denardi, Juan Pablo\nTejerina Mart??nez, Matias Nicol??s\nAguade, Francisco Miguel\nGiannini Pugliese, Lorenzo\nSteffolani, Andr??s Ignacio\nVera Borghello, Nicol??s"
              ],
              [
                "IRAN",
                "Dario Bongiovani",
                "Maximiliano Smidt",
                "Lehner Facundo\nAch??val Harriague Facundo\nQuevedo Palacio Tiago Agust??n\nAndrada Ezequiel Ivan\nFiocchi Renzo Mateo\nBagatello Fabricio Emiliano\nDe Goycoechea Tomas\nFarja Gaspar Marcelo\nSibilla Jos??\nVivanco Cabrera Jos?? Francisco\nMiralles Peralta Gonzalo Benjam??n\nOlsen Joaquin\nMatrone Santino\nCis Ronnie\nPezoa Gechelin Francisco\nGonzalez Raffetto Francisco Jose\nHegi Joaquin Gabriel\nReynoso Mateo\nVieyra Lohr Jeremias Alfredo\nCavestri Giuliano Germ??n"
              ],
              [
                "JAPON",
                "Josefina Luque",
                "",
                "Cativa Vullo Alex Mariano\nRosas Reynoso Juli??n Maximiliano\nCutri, Renato\nCampana, Bruno Nicolas\nZampieri Mart??n Bautista\nMorales Demar??a Franco\nBarrionuevo Forcher Ignacio\nTapia Lucas Irineo\nGiayetto Francisco\nSerrano, Mateo Ezequiel\nMarquez, Emiliano\nBritos, Joaquin\nGiraudo, Tomas Santiago\nG??mez Coria, Tom??s\nClavel, Andres\nFern??ndez Mateo Emanuel"
              ],
              [
                "MEXICO",
                "Javier Bassotti",
                "Luciano Cortesini",
                "Vaquel Valentin Tiago\nLedesma Facundo\nZilberberg Mirman Tom??s Rafael\nFranco Iglesias Manuel\nDonadille Tomas Andres\nArriba Alvaro Emanuel\nFasioli Benjamin\nGenari Duarte Agust??n\nDe Cecco Franco\nArmesto Aranda Nicolas Baltazar\nQuintero Montenegro Joaqu??n Alejandro\nLehder Ignacio Manuel\nFern??ndez Tsuru Sim??n\nLlanos Sosa Alejo Agust??n\nPalma Francisco\nGaray Garnero Federico Samuel\nAlvarez Francisco Martin\nRasch Montini Bautista Al??\nFieroli Jerem??as"
              ],
              [
                "PERU",
                "Ricardo Pereyra",
                "Facundo Oliva",
                "Winter Tovagliari Tob??as Eliel\nLuna Juncos Samuel\nCordoba Facundo\nFontani Santino\nLuj??n Maximiliano\nFern??ndez Bazterrechea Alejo\nMurua Francisco Abel\nGrasso Felipe\nSverko Joaquin\nGatti Gregorio Bautista\nRamos Erquicia Juan Cruz\nGonzalez Bossi Joaquin\nS??nchez Lescano Emanuel\nTchopanian Moyano Tom??s Mart??n\nOses Miguel Armando\nOlocco Sim??n\nDemarchi Lucio\nCastellano Aimale Joaquin Ignacio\nSarsur Villal??n Al Farid"
              ],
              [
                "POLONIA",
                "Luciano Michalik",
                "",
                "Sahonero, Massimo Ticiano\nChialvo, Lautaro\nFini Minu?? Marco\nZabala, Valentin\nRamos Erquicia, Nicol??s Jos??\nG??ell Tom??s Mariano\nBergallo, Mateo\nNu??ez Vidal, Bruno\nMu??oz, Tomas\nSallago, Franco Tiziano\nPozo, Santiago\nFilossi Ignacio\nPalacios Isola Mateo Ulises\nGenari Duarte Pablo Tom??s\nRamos Panzeri Facundo Jos??\nC??nepa Ignacio\nBianchi, Federico"
              ],
              [
                "PORTUGAL",
                "Dario Cordoba",
                "",
                "Miller, Derek\nMac??as, Agustin Ezequiel\nPicone, Juan Martin\nTorres Gait??n, Valentin\nBisio Griffa, Facundo Matias\nLucero, Octavio Nicolas\nSeidel M??ximo\nZampetti, Simon\nPepi, Lorenzo Agustin\nAcu??a Pagliaro, Gaspar\nLuna, Joaqu??n Alejandro\nChungara Kessler Juli??n Mat??as\nFaus, Francisco Nahuel\nBergliaffa, Nicolas\nCeballos, Franco Eli??n\nBarale, Dante"
              ],
              [
                "QATAR",
                "Agustin Aguero",
                "",
                "Petrini, Matias\nPalombo, Santiago\nCeballos Gorosito Lautaro Jes??s\nCardinale, Fabrizzio Gabriel\nChayle, Joaqu??n Nicol??s\nMontenegro Garnero Tom??s\nLeszczynski, Mirko Bautista\nZamora Papanicolau, Pedro\nFunes Tadeo\nFarjat Joaqu??n Ignacio\nWeigandt, Timoteo\nAbaca, Iv??n Agust??n\nGirardi Spinella, Facundo Benjamin\nOrellano, Joaquin Marcelo\nL??pez Hern??ndez, Mat??as\nGonzalez Alvarez, Ignacio Jos??\nAllende Martinez, Valentin"
              ],
              [
                "RUSIA",
                "Sol Maidana",
                "",
                "Vacca, Vicente\nF??rst, Mat??as\nPeralta Tomas, Lucas Diogo\nGalleguillo, Lucas Emiliano\nPizoni Morales Valentino\nCirrincione Bo, Luciano\nGallone, Mateo\nOperto Alex\nAltero, Tomas\nHerrera, Diego Nicol??s\nRosas Reynoso, Franco Emiliano\nSinches Lautaro Mateo\nG??mez Coria M??ximo\nBarbero Gatica, Bautista\nChialvo Morales, Lorenzo\nSoler, Julian Emiliano\nNieva, Thomas Ivo Valent??n"
              ],
              [
                "SENEGAL",
                "Silvia Blazer",
                "",
                "Homola, Julian\nVercellone, Carlos Ignacio\nBernat Maggi, Ignacio Manuel\nCarbajal, Maximo\nAllegri, Conrado Patricio\nRivero Reyes, Octavio Fabian\nCastellano Valent??n\nPerusia , Santiago\nAndino Aflalo, Marco\nGregoris Noriega, Franco\nProsdocimo, Renzo\nUrani Cuevas, Felipe Julian\nGenaro Juan Pablo\nOlmos, Juan Pedro\nParino, Valentino\nGrau, Santiago Tomas\nPeralta Martinez, Ignacio\n"
              ],
              [
                "SERBIA",
                "Gabriela Arguello",
                "",
                "Riccioni Santiago\nCastillo Juan Cruz\nFerreyra Chavez Mariano Nicolas\nIsle??os Ramiro Joaqu??n\nOdetti Kratina Maximo\nAybar Francisco\nRolo Juan Pablo\nL??pez Gilardoni Mateo Jos??\nHoppe Castro Joaquin Ignacio\nAlladio Franco Bautista\nRuiz Maximo Agustin\nBrega Santino\nFava Maximo\nMatoff Graffi Santiago\nCanavesio Leonardo Martin\nCuretti Maximiliano Luis\nMalap Thiago\nOlivero Tomas Agust??n\nLagger Agustin"
              ],
              [
                "SUIZA",
                "Diego Agostini",
                "",
                "Maldonado G??mez Francisco Gast??n\nGiletta Fabrizio Agust??n\nChazarreta, Santiago Nicolas\nBerbotto, Joaqu??n\nPaez Scruzzi, Mateo\nBall Abalos Franco Iv??n\nIssidoros, Benjam??n\nDe Ipola, Matias Agustin\nRivadeneira, Franco\nDubois Bruenner Mariano Gabriel\nOlmos, Joaquin Emanuel\nIzquierdo Cafaro, Agustin\nSalvay Mendez, Juan Santiago\nMazzuchin, Giuliano Leonel\nFerrero Duret, Francisco Daniel\nVaca Starodubsky Marcos Agust??n"
              ],
              [
                "TUNEZ",
                "Ariel Farias",
                "",
                "Gatti, Benjamin Pablo\nApra, Matias\nFulgenzi, Santino\nLacaze, Miqueas Nahuel\nPayen Graffigna, Francisco Javier\nTempesti Ruffino, Mateo\nCardo, Francisco\nPuig, Hermes Demian\nPepi Marinsalda, Augusto\nD??az Broilo Alejo Luis\nCarri??n Mateo Gabriel\nCama??o, Francisco Jos??\nSchiad??, Agustin Exequiel\nPolop Mateo\nSueldo, Santiago Tomas\nGuerra Sandes , Matias Nahuel\nManzotti Koval, Benicio"
              ],
              [
                "URUGUAY",
                "Cintia Lezcano",
                "",
                "Dominguez Duarte Marco Antonio\nMorais Joaqu??n\nMachuca Iba??ez Mateo Tom??s\nCastro Lencina, Mateo Benjamin\nViva, Jerem??as Nicol??s\nM??rquez Lisandro\nGuchea Lezama, Augusto\nMartiarena Tom??s\nCimatti Bautista\nBianchettin, Emilio Augusto\nVelez Villalva Valentino\nQuaino Juan Cruz\nBabiachuk Yaco Iv??n\nSuarez, Lautaro Ismael\nL??pez, Mateo Gustavo\nMorales, Jer??nimo\nLeoni, Mateo Macario"
              ]
            ]
          }));
    */
  }

  getPuntajes(): Observable<Puntaje[]> {
    return this.authenticate(() => this.loadEntities("%27Puntajes%27!A1%3AH33", v => new Puntaje(v)));
    /*
        return of(this.toPuntajes({
          majorDimension: "", range: "",
          "values": [
            [
              "PAIS",
              "ALAS",
              "FUSELAJE",
              "RUEDAS",
              "COLA",
              "NAFTA",
              "MOTOR",
              "PASAPORTE"
            ],
            [
              "ALEMANIA",
              "1",
              "0",
              "1",
              "1",
              "90",
              "0",
              "0"
            ],
            [
              "ARABIA SAUDITA",
              "2",
              "1",
              "2",
              "2",
              "80",
              "1",
              "1"
            ],
            [
              "ARGENTINA",
              "3",
              "0",
              "3",
              "3",
              "70",
              "0",
              "0"
            ],
            [
              "BELGICA",
              "1",
              "1",
              "1",
              "1",
              "60",
              "1",
              "1"
            ],
            [
              "BRASIL",
              "2",
              "0",
              "2",
              "2",
              "50",
              "0",
              "0"
            ],
            [
              "CAMERUN",
              "3",
              "1",
              "3",
              "3",
              "40",
              "1",
              "1"
            ],
            [
              "CANADA",
              "1",
              "0",
              "1",
              "1",
              "30",
              "0",
              "0"
            ],
            [
              "COLOMBIA",
              "2",
              "1",
              "2",
              "2",
              "20",
              "1",
              "1"
            ],
            [
              "COREA",
              "3",
              "0",
              "3",
              "3",
              "10",
              "0",
              "0"
            ],
            [
              "CROACIA",
              "1",
              "1",
              "1",
              "1",
              "0",
              "1",
              "1"
            ],
            [
              "DINAMARCA",
              "2",
              "0",
              "2",
              "2",
              "90",
              "0",
              "0"
            ],
            [
              "ECUADOR",
              "3",
              "1",
              "3",
              "3",
              "80",
              "1",
              "1"
            ],
            [
              "EGIPTO",
              "1",
              "0",
              "1",
              "1",
              "70",
              "0",
              "0"
            ],
            [
              "ESPA??A",
              "2",
              "1",
              "2",
              "2",
              "60",
              "1",
              "1"
            ],
            [
              "ESTADOS UNIDOS",
              "3",
              "0",
              "3",
              "3",
              "50",
              "0",
              "0"
            ],
            [
              "FRANCIA",
              "1",
              "1",
              "1",
              "1",
              "40",
              "1",
              "1"
            ],
            [
              "GHANA",
              "2",
              "0",
              "2",
              "2",
              "30",
              "0",
              "0"
            ],
            [
              "HOLANDA",
              "3",
              "1",
              "3",
              "3",
              "20",
              "1",
              "1"
            ],
            [
              "INGLATERRA",
              "1",
              "0",
              "1",
              "1",
              "10",
              "0",
              "0"
            ],
            [
              "IRAN",
              "2",
              "1",
              "2",
              "2",
              "34",
              "1",
              "1"
            ],
            [
              "JAPON",
              "3",
              "0",
              "3",
              "3",
              "90",
              "0",
              "0"
            ],
            [
              "MEXICO",
              "1",
              "1",
              "1",
              "1",
              "80",
              "1",
              "1"
            ],
            [
              "PERU",
              "2",
              "0",
              "2",
              "2",
              "70",
              "0",
              "0"
            ],
            [
              "POLONIA",
              "3",
              "1",
              "3",
              "3",
              "60",
              "1",
              "1"
            ],
            [
              "PORTUGAL",
              "1",
              "0",
              "1",
              "1",
              "50",
              "0",
              "0"
            ],
            [
              "QATAR",
              "2",
              "1",
              "2",
              "2",
              "40",
              "1",
              "1"
            ],
            [
              "RUSIA",
              "3",
              "0",
              "3",
              "3",
              "30",
              "0",
              "0"
            ],
            [
              "SENEGAL",
              "1",
              "1",
              "1",
              "1",
              "20",
              "1",
              "1"
            ],
            [
              "SERBIA",
              "2",
              "0",
              "2",
              "2",
              "10",
              "0",
              "0"
            ],
            [
              "SUIZA",
              "3",
              "1",
              "3",
              "3",
              "0",
              "1",
              "1"
            ],
            [
              "TUNEZ",
              "2",
              "0",
              "2",
              "2",
              "43",
              "0",
              "0"
            ],
            [
              "URUGUAY",
              "1",
              "1",
              "1",
              "1",
              "32",
              "1",
              "1"
            ]
          ]
        }));
    */
  }

  private loadEntities<T>(range: string, mapper: (v: string[]) => T): T[] {
    const API_KEY = 'AIzaSyBvyqJVeKKApOYSyY_1_2LIkVCm3c50JkM';
    const http = new XMLHttpRequest();
    http.open('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1W6GZd4QipZVdm4PJwoLzCcTW8qphGUa6H4_1Rbw2xRo/values/' + range + '?access_token=' + this.token_response.access_token + '&key=' + API_KEY, false);
    http.setRequestHeader('Authorization', this.token_response.token_type + ' ' + this.token_response.access_token);
    http.setRequestHeader('Accept', 'application/json');
    http.send(null);
    return SheetsService.toEntities(JSON.parse(http.responseText), mapper);
  }
}

