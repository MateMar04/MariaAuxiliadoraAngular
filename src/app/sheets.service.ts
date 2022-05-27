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
                "Galvez Thiago Ezequiel\nPaez Felipe Gabriel\nCorallo Margosian Maximo\nBorghello Genaro Raúl\nLopresti Maximo\nRuiz Manso Pedro\nCardo Ramiro\nZarazaga Valentín\nGonzo Martín Benjamín\nPedone Lopez Faustino Camilo\nMoesch Santino\nMarcantonelli Monferran Mateo\nGuerra Sandes Franchesco Agustin\nDíaz García Máximo Ezequiel\nPagliettini Tomas\nPucheta Noguera Antonio\nJuri Lenardón Alejandro Augusto\nDaveloze Bautista\nPepi Leon Martin"
              ],
              [
                "ARABIA SAUDITA",
                "Diego Porrini",
                "",
                "Martín, Maximiliano\nGonzo Martín, Tomás\nMercado Gurdulich, Facundo\nCórdoba, Juan Ignacio\nSalamone Gonzalez, Santino\nJurado Villena, Lorenzo Adrián\nBrezzo Francisco Miguel\nRomera, Matias Daniel\nGalaverna Lorenzo\nVicente, Bruno\nAndino Sosa Guillermo Gustavo\nFillol Ballesteros , Ignacio Agustin\nEtcheverry Soto, Matías\nSpinosa, Augusto Luis\nTorres Fatala, Nazareno\nOliveros Gigena, Joaquín\nRaviolo, Mateo"
              ],
              [
                "ARGENTINA",
                "Federico Ferraro",
                "Elías Bulacio",
                "Boiko, Federico\nAbril Perrig, Teo Nicolas\nSessarego, Santino\nBlazquez Maximo Tomás\nFerrario, Santiago\nMartino, Nahuel Gabriel\nCampos, Benjamin Augusto\nRolleri Valentino Filippo\nMontini Carrillo, Francisco Bautista\nDi Tomaso Fabricio Guido\nMorero, Guido Martin\nZartarian Boetto, Pedro\nMoya Santucho, Atila León\nFerro Agustín\nMiranda Mateo\nEtchechoury, Luca\nPurro, Ezequiel"
              ],
              [
                "BELGICA",
                "Eugenia Hazebrouck",
                "",
                "Malap Lucciano\nButeler Clariá Mateo\nEspañon Bautista\nAngelelli Facundo\nCastellano Musotto Joaquin\nSalatin Francisco\nNeira Santiago\nCantarelli Carrara Tomás Alejandro\nKunda Leandro Emmanuel\nPereyra Santiago Joaquin\nCanosa Alejandro Luis\nCortez Espinosa Juan Cruz\nMancuso Adriano\nMendoza Velez Fausto\nPerea Bruno\nBarragán Tomás\nCariola Marcelo Reynaldo\nBornancini Ignacio Salvador\nApra Tomas"
              ],
              [
                "BRASIL",
                "Gustavo Funes",
                "",
                "Cherini Isidoro Oscar Manuel\nCastro Rolando Mateo Elías\nPonce Neumann José Lucas\nGraziano, Tomás\nVaquero, Alejo\nBuffaz Santiago\nOviedo Arrieta, Santiago Joaquin\nMurua Grafinger, Luciano\nVelez Lautaro Matías\nVago Grecco, Fernando Mateo\nGhione Pedernera, Valentino\nMarioli, Emiliano\nBarbini Molluso, Matteo David\nFregonese, Benjamin\nSadukas, Federico\nGauna Roman Ross, Ignacio A.\nChudnosky Joaquín Ignacio"
              ],
              [
                "CAMERUN",
                "Juan Pablo Carta",
                "Lautaro Oliva",
                "Mendez, Lautaro Emiliano\nTanus, Santiago Daniel\nCutri, Lorenzo\nIrisarri, Lautaro\nLuna Tomás Ernesto\nCavalli Barrera, Agustín\nFunes Facundo Yair\nHeredia, Lionel Agustin\nFerreyra, Santiago José\nMartínez Luque Maximiliano Rafael\nLagger Octavio\nGarcía Lucas Julián\nCuretti, Lucas Omar\nLitrenta, Marco Ignacio\nBarinboim, Ezequiel\nZangara Rüffer, Máximo"
              ],
              [
                "CANADA",
                "Nicolas Sponton",
                "Jose Cargnelutti",
                "Olivero Nicolas Ezequiel\nFerrero Ignacio Emanuel\nArmesto Abba Felipe\nBattaíno Felipe\nFlores Cecchin Angel Joaquin\nMihaic Mateo\nVirgolini Facundo Ezequiel\nPonce Bracamonte Samuel Alexis\nMeighorner Casas Lucio Alberto\nTiberti Francisco Nicolás\nLescano Tadeo\nCristiani Santino\nBeauge Pedro\nSibona Octavio\nGaido Tanquia Ramiro Nicolas\nJuarez Acevedo Lionel\nCarrera Matias Daniel\nSferco Marat\nCorrea Genaro Agustin"
              ],
              [
                "COLOMBIA",
                "Monica Flores",
                "Facundo Giordano ",
                "Peralta Marques Juan Manuel\nChiapero Francisco\nLastra Flores Tomás Agustín\nPavan Tomas Agustin\nRodriguez Martin Nicolas\nAlladio Lautaro Agustín\nVacca Antonio\nBalmaceda Emanuel Ignacio\nZunino Mateo\nBodereau Fox Bautista\nPaez Gonzalo\nBanegas Ignacio Joaquin\nFredes Carana Santino David\nAradas Renzo\nGuchea Lezama León\nBonanate Rubiolo Pedro\nMartínez Nicolás Ezequiel\nVoltolini Gómez Conrado Nicolás\nArmando Baldassa Franco"
              ],
              [
                "COREA",
                "Gabriel Muñoz",
                "Cassavechia Franco",
                "Gonzalez Zar Tobias\nFerro Gino Danilo\nFerrazzuolo Niza Benjamín\nGiraudo Franco\nBernat Maggi Matias Eduardo\nCarreras Elkin Facundo Miguel\nGorosito Armoa Nicolás\nFlores Tifner Lisandro\nPerco Romero Joaquin\nBruno Bernardis Lorenzo\nBoiko Pedro Benjamín\nAguirre Lopez Felipe\nPuga Joaquin\nLoza Marcos Emilio\nBerzón Márquez Theo\nMargaria Smith Ramiro\nGonzalez Bossi Benjamin\nOlmedo Valentino Mateo\nCasavecchia Barrera Tomàs Ignacio\nMusso Blua Juan Ignacio"
              ],
              [
                "CROACIA",
                "Guillermo Bustos",
                "",
                "Cabral Belén Luciano\nCandiotto Luca\nJerez Halabi Ignacio\nMedina Lucini Facundo\nConejero Martinez Francisco Emanuel\nLedesma Magnien Matias\nGaray Allasia Santiago\nMiranda Franco\nRamos Panzeri Jeronimo\nNuñez Tomas Santino\nLeones Gastón\nTello Altamirano Feliciano\nCandiotto Gino\nMarzo Brasca Santino\nEspil Federico De Dios\nGarcía Oviedo Jerónimo José\nEscañuela Cisterna Mateo\nMartin Santiago\nCastillo Franco Ignacio"
              ],
              [
                "DINAMARCA",
                "Ruben Arce",
                "",
                "Laporte León\nRizzi Constantino\nMenem Mateo Agustín\nPastorino Joaquin Nicolas\nPaez Scruzzi Octavio\nMacias Luciano Nicolas\nCerri Valentín Rafael\nCollino Tomás Pietro\nGrimas Lautaro Nicolás\nDel Gesso Nepote Pedro\nCarrera Sebastian Nicolas\nIrigo Sibilla Ignacio\nIvanovich Jose\nMartinez Jarchum Lautaro Benjamin\nGeorgetti Mateo\nSodero Juan Jose\nBazan Moyano Mateo Benjamín\nVivas Gonella Francisco\nMiscevich Ivo"
              ],
              [
                "ECUADOR",
                "Juan Fernandez",
                "Fabricio Zuliani",
                "Salonia Agustín José\nMartinez Jarchum, Gonzalo Nicolas\nPárraga, Joaquín Valentino\nBustamante, Ignacio Benjamín\nSagray, Agustin\nPapi, Mateo\nAldasoro González Joaquín Enrique\nMendez, Fabricio Ezequiel\nCarranza Santiago\nSanramé, Lucas André\nAndrada Garcia, David Elian\nSeidel, Santino\nBustos Gaspar\nSalatin, Thomas\nPeralta, Lucio\nMarrone, Fabrizio"
              ],
              [
                "EGIPTO",
                "Pablo Crivello",
                "Santiago Cagliero",
                "Palacios Agosto Lorenzo\nSponton Lautaro Ezequiel\nAlvarez Juan Cruz\nAtecas Raspanti Tobias\nVago Grecco Ignacio Daniel\nPrinzi Franco Ariel\nMordcovich Bautista\nVillegas Lucas Martin\nSegura Marsal Bruno Angel\nLigato Benicio\nGiraudo Juan Ignacio\nCarranza Glück Tomás\nGutierrez Bautista\nVerzino Mateo\nSibona Luciano\nRivilli Martos Alessio\nBorrione Tomas Ezequiel\nBoboskich Pailler Santino\nFacta Bautista\nBerbotto Benjamín"
              ],
              [
                "ESPAÑA",
                "Magdalena Buldrini",
                "Agustin Odetti",
                "Wapñarsky Jeremias\nValdez Saleme Facundo\nOperto Tomas\nPereyra Laxague Ignacio Reyes\nVega Federico Francisco\nBenavidez Lautaro\nLopez Cruz Benjamín\nAlbert Anzolini Bruno\nCuret Varetto Juan Cruz\nBaravalle Bautista\nBono Santino Nicolás\nNicolodi Marcos Ernesto\nBouza Casas Máximo Emanuel\nCirrincione Bo Lorenzo\nCarot Agustin\nBerteli Tarquini Benjamín\nBartolucci Gennaro\nPalacios Rodrigo Ezequiel\nBoisseau Juan Cruz\nVirgolini Santiago Agustín"
              ],
              [
                "ESTADOS UNIDOS",
                "Nani Lopez",
                "Franco Cometto",
                "Passadore Agustin\nDi Pasquantonio Mateo\nFerrero Lorenzo\nLamberghini Nicklison Felipe\nCarranza Benjamin Gabriel\nRaviolo Juan Ignacio\nBorgiattino Facundo Ignacio\nArrieta Juan Pablo\nWeiss Olivieri Sebastian\nLedesma Santiago\nFaule Felipe\nVercellone Pedro Argentino\nEchepare Rivas Juan Cruz\nDi Tella Buttigliengo Luca\nDiaz Cornejo Lucio\nSuescun Rebollo Bruno Fabrizzio\nGauna Ferreyra Ignacio Agustin\nAcosta Pinto Ivan Ignacio\nSecchi Enzo Román\n"
              ],
              [
                "FRANCIA",
                "Jesus Vila",
                "Tomas Perona",
                "Paolinelli Luciano Vito\nSpalla, Octavio\nBühler, Octavio Ernesto\nRomero Ignacio\nPaz, Agustin\nCarranza, Jose Ignacio\nArmesto Abba, Ignacio\nLópez De Alda, Luciano\nFieroli, Joaquín\nSánchez, Matías Alejo\nMartin Rodrigo, Santiago\nUrtubey José Agustín\nBenegas Prado, Lautaro\nDe La Fuente, Juan Ignacio\nLópez Fabre Manuel\nCastro Chesini, Marcos Alejandro\nHlavach, Joaquín"
              ],
              [
                "GHANA",
                "Hernan Martinez",
                "Mateo Marchisone",
                "Di Tomaso Mauro Guillermo\nPeralta Facundo\nOliva Sosa Tiago Lautaro\nTuñon Agustin\nGenga Liendo Juan Ignacio\nCarreras Eugenio\nEstepovoy Novak\nRodriguez Planells Oviedo Ignacio\nArias Felipe Máximo\nFarah Juan Ignacio\nPaz Joaquin\nLondero Agostinelli Facundo\nBianchini Francisco Andrés\nFerro Bautista\nÁrbol Ramiro\nBigo Pereyra Facundo Tomas\nBenegas Prado Bautista\nBelardinelli Franco\nButtazzoni Solís Tomás Francisco"
              ],
              [
                "HOLANDA",
                "Juan Frattin",
                "David Quiroga",
                "Cruz Figueroa Jose\nSquinobal Lucero Joaquín\nMargaria Smith Valentino\nMartos Renato\nMoya Federico Nicolás\nMuttigliengo Bautista\nZamora Papanicolau Santiago\nCorti Paredes Ezequiel Maximiliano\nLedesma Magnien Gabriel\nBrocal Bernasconi Mateo\nTisano Pacciaroni Fabrizio\nLudueña De Melo Alejandro\nPereyra Manuel\nRighetti Martino\nDesmarás Juan Cruz\nScarlato Garcia Juan Cruz\nMelgarejo Marcato Alvaro\nGatto Acosta Juan Cruz\nCordoba Manuel\nManfredini Santino\n"
              ],
              [
                "INGLATERRA",
                "Elisa Romero",
                "",
                "Femayor, Tomás Lorenzo\nAsis, Tomas\nCassina Gaudiano Marcos Nicolás\nRavetti Voget, Mateo Carlos\nCantarelli Carrara, Juan Cruz\nGonzalez Murina, Francisco\nBustamante Valenzuela, Joaquín\nPagani, Nicolas\nFerreyra, Octavio Nicolas\nLlanos, Maximo Martin\nLoza Denardi, Juan Pablo\nTejerina Martínez, Matias Nicolás\nAguade, Francisco Miguel\nGiannini Pugliese, Lorenzo\nSteffolani, Andrés Ignacio\nVera Borghello, Nicolás"
              ],
              [
                "IRAN",
                "Dario Bongiovani",
                "Maximiliano Smidt",
                "Lehner Facundo\nAchával Harriague Facundo\nQuevedo Palacio Tiago Agustín\nAndrada Ezequiel Ivan\nFiocchi Renzo Mateo\nBagatello Fabricio Emiliano\nDe Goycoechea Tomas\nFarja Gaspar Marcelo\nSibilla José\nVivanco Cabrera José Francisco\nMiralles Peralta Gonzalo Benjamín\nOlsen Joaquin\nMatrone Santino\nCis Ronnie\nPezoa Gechelin Francisco\nGonzalez Raffetto Francisco Jose\nHegi Joaquin Gabriel\nReynoso Mateo\nVieyra Lohr Jeremias Alfredo\nCavestri Giuliano Germán"
              ],
              [
                "JAPON",
                "Josefina Luque",
                "",
                "Cativa Vullo Alex Mariano\nRosas Reynoso Julián Maximiliano\nCutri, Renato\nCampana, Bruno Nicolas\nZampieri Martín Bautista\nMorales Demaría Franco\nBarrionuevo Forcher Ignacio\nTapia Lucas Irineo\nGiayetto Francisco\nSerrano, Mateo Ezequiel\nMarquez, Emiliano\nBritos, Joaquin\nGiraudo, Tomas Santiago\nGómez Coria, Tomás\nClavel, Andres\nFernández Mateo Emanuel"
              ],
              [
                "MEXICO",
                "Javier Bassotti",
                "Luciano Cortesini",
                "Vaquel Valentin Tiago\nLedesma Facundo\nZilberberg Mirman Tomás Rafael\nFranco Iglesias Manuel\nDonadille Tomas Andres\nArriba Alvaro Emanuel\nFasioli Benjamin\nGenari Duarte Agustín\nDe Cecco Franco\nArmesto Aranda Nicolas Baltazar\nQuintero Montenegro Joaquín Alejandro\nLehder Ignacio Manuel\nFernández Tsuru Simón\nLlanos Sosa Alejo Agustín\nPalma Francisco\nGaray Garnero Federico Samuel\nAlvarez Francisco Martin\nRasch Montini Bautista Alé\nFieroli Jeremías"
              ],
              [
                "PERU",
                "Ricardo Pereyra",
                "Facundo Oliva",
                "Winter Tovagliari Tobías Eliel\nLuna Juncos Samuel\nCordoba Facundo\nFontani Santino\nLuján Maximiliano\nFernández Bazterrechea Alejo\nMurua Francisco Abel\nGrasso Felipe\nSverko Joaquin\nGatti Gregorio Bautista\nRamos Erquicia Juan Cruz\nGonzalez Bossi Joaquin\nSánchez Lescano Emanuel\nTchopanian Moyano Tomás Martín\nOses Miguel Armando\nOlocco Simón\nDemarchi Lucio\nCastellano Aimale Joaquin Ignacio\nSarsur Villalón Al Farid"
              ],
              [
                "POLONIA",
                "Luciano Michalik",
                "",
                "Sahonero, Massimo Ticiano\nChialvo, Lautaro\nFini Minué Marco\nZabala, Valentin\nRamos Erquicia, Nicolás José\nGüell Tomás Mariano\nBergallo, Mateo\nNuñez Vidal, Bruno\nMuñoz, Tomas\nSallago, Franco Tiziano\nPozo, Santiago\nFilossi Ignacio\nPalacios Isola Mateo Ulises\nGenari Duarte Pablo Tomás\nRamos Panzeri Facundo José\nCánepa Ignacio\nBianchi, Federico"
              ],
              [
                "PORTUGAL",
                "Dario Cordoba",
                "",
                "Miller, Derek\nMacías, Agustin Ezequiel\nPicone, Juan Martin\nTorres Gaitán, Valentin\nBisio Griffa, Facundo Matias\nLucero, Octavio Nicolas\nSeidel Máximo\nZampetti, Simon\nPepi, Lorenzo Agustin\nAcuña Pagliaro, Gaspar\nLuna, Joaquín Alejandro\nChungara Kessler Julián Matías\nFaus, Francisco Nahuel\nBergliaffa, Nicolas\nCeballos, Franco Elián\nBarale, Dante"
              ],
              [
                "QATAR",
                "Agustin Aguero",
                "",
                "Petrini, Matias\nPalombo, Santiago\nCeballos Gorosito Lautaro Jesús\nCardinale, Fabrizzio Gabriel\nChayle, Joaquín Nicolás\nMontenegro Garnero Tomás\nLeszczynski, Mirko Bautista\nZamora Papanicolau, Pedro\nFunes Tadeo\nFarjat Joaquín Ignacio\nWeigandt, Timoteo\nAbaca, Iván Agustín\nGirardi Spinella, Facundo Benjamin\nOrellano, Joaquin Marcelo\nLópez Hernández, Matías\nGonzalez Alvarez, Ignacio José\nAllende Martinez, Valentin"
              ],
              [
                "RUSIA",
                "Sol Maidana",
                "",
                "Vacca, Vicente\nFürst, Matías\nPeralta Tomas, Lucas Diogo\nGalleguillo, Lucas Emiliano\nPizoni Morales Valentino\nCirrincione Bo, Luciano\nGallone, Mateo\nOperto Alex\nAltero, Tomas\nHerrera, Diego Nicolás\nRosas Reynoso, Franco Emiliano\nSinches Lautaro Mateo\nGómez Coria Máximo\nBarbero Gatica, Bautista\nChialvo Morales, Lorenzo\nSoler, Julian Emiliano\nNieva, Thomas Ivo Valentín"
              ],
              [
                "SENEGAL",
                "Silvia Blazer",
                "",
                "Homola, Julian\nVercellone, Carlos Ignacio\nBernat Maggi, Ignacio Manuel\nCarbajal, Maximo\nAllegri, Conrado Patricio\nRivero Reyes, Octavio Fabian\nCastellano Valentín\nPerusia , Santiago\nAndino Aflalo, Marco\nGregoris Noriega, Franco\nProsdocimo, Renzo\nUrani Cuevas, Felipe Julian\nGenaro Juan Pablo\nOlmos, Juan Pedro\nParino, Valentino\nGrau, Santiago Tomas\nPeralta Martinez, Ignacio\n"
              ],
              [
                "SERBIA",
                "Gabriela Arguello",
                "",
                "Riccioni Santiago\nCastillo Juan Cruz\nFerreyra Chavez Mariano Nicolas\nIsleños Ramiro Joaquín\nOdetti Kratina Maximo\nAybar Francisco\nRolo Juan Pablo\nLópez Gilardoni Mateo José\nHoppe Castro Joaquin Ignacio\nAlladio Franco Bautista\nRuiz Maximo Agustin\nBrega Santino\nFava Maximo\nMatoff Graffi Santiago\nCanavesio Leonardo Martin\nCuretti Maximiliano Luis\nMalap Thiago\nOlivero Tomas Agustín\nLagger Agustin"
              ],
              [
                "SUIZA",
                "Diego Agostini",
                "",
                "Maldonado Gómez Francisco Gastón\nGiletta Fabrizio Agustín\nChazarreta, Santiago Nicolas\nBerbotto, Joaquín\nPaez Scruzzi, Mateo\nBall Abalos Franco Iván\nIssidoros, Benjamín\nDe Ipola, Matias Agustin\nRivadeneira, Franco\nDubois Bruenner Mariano Gabriel\nOlmos, Joaquin Emanuel\nIzquierdo Cafaro, Agustin\nSalvay Mendez, Juan Santiago\nMazzuchin, Giuliano Leonel\nFerrero Duret, Francisco Daniel\nVaca Starodubsky Marcos Agustín"
              ],
              [
                "TUNEZ",
                "Ariel Farias",
                "",
                "Gatti, Benjamin Pablo\nApra, Matias\nFulgenzi, Santino\nLacaze, Miqueas Nahuel\nPayen Graffigna, Francisco Javier\nTempesti Ruffino, Mateo\nCardo, Francisco\nPuig, Hermes Demian\nPepi Marinsalda, Augusto\nDíaz Broilo Alejo Luis\nCarrión Mateo Gabriel\nCamaño, Francisco José\nSchiadá, Agustin Exequiel\nPolop Mateo\nSueldo, Santiago Tomas\nGuerra Sandes , Matias Nahuel\nManzotti Koval, Benicio"
              ],
              [
                "URUGUAY",
                "Cintia Lezcano",
                "",
                "Dominguez Duarte Marco Antonio\nMorais Joaquín\nMachuca Ibañez Mateo Tomás\nCastro Lencina, Mateo Benjamin\nViva, Jeremías Nicolás\nMárquez Lisandro\nGuchea Lezama, Augusto\nMartiarena Tomás\nCimatti Bautista\nBianchettin, Emilio Augusto\nVelez Villalva Valentino\nQuaino Juan Cruz\nBabiachuk Yaco Iván\nSuarez, Lautaro Ismael\nLópez, Mateo Gustavo\nMorales, Jerónimo\nLeoni, Mateo Macario"
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
              "ESPAÑA",
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

