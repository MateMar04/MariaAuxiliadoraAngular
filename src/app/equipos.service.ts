import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Equipo} from "./models/equipo";
import {GSheet} from "./models/gsheet";

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor() {
  }

  private toEquipos(gsheet: GSheet): Equipo[] {
    return gsheet.values.slice(1).map(v => new Equipo(v))
  }

  getEquipos(): Observable<Equipo[]> {
    return of(this.toEquipos({
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
    }))
  }
}

