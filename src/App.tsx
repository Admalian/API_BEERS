//----------------------------------------------------------------
// LES IMPORTS REACT
//----------------------------------------------------------------

import React from "react";
import {
  Grid,
  GridToolbar,
  GridColumn,
  GridPageChangeEvent,
  GridCellProps
} from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { SwitchChangeEvent, Switch } from "@progress/kendo-react-inputs";
import { Slide } from "@progress/kendo-react-animation";
//----------------------------------------------------------------
// LES IMPORTS D'INTERFACES
//----------------------------------------------------------------

import { Beer, PageState } from "./interfaces";

//----------------------------------------------------------------
// LES IMPORTS CSS
//----------------------------------------------------------------

import "./styles.css";

//----------------------------------------------------------------
// FONCTION APP
//----------------------------------------------------------------

function App() {
  const apiBeers = "https://api.punkapi.com/v2/beers";
  const [arrayBeers, setarrayBeers] = React.useState<Beer[]>([]);

  // ------------------------------------------------------------------
  // CHARGEMENT DE LA BOITE MODALE
  // ------------------------------------------------------------------

  let allBeers = [];
  let urlApi = "";

  // Requête JSON vers l'API en fonction d'un paramètre de limite d'alccol "abv"
  function pullJson(abv?: number) {
    typeof abv === "undefined"
      ? (urlApi = apiBeers)
      : (urlApi = apiBeers + "?abv_gt=" + abv.toString());

    fetch(urlApi).then((response) => {
      response.json().then((responseData) => {
        allBeers = responseData.map(function (beer: any = [], i: number) {
          //console.log(beer);

          let dataBeers = {
            beerId: beer.id,
            beerName: beer.name,
            beerTagline: beer.tagline,
            beerAbv: beer.abv,
            beerImgUrl: beer.image_url,
            beerDescription: beer.description
          };
          return dataBeers;
        });
        setarrayBeers(allBeers);
      });
    });
  }

  // Appel de l'API au chargement de la page
  React.useEffect(() => {
    pullJson();
  }, []);

  // -----------------------------------------------------------------------
  // PARAMETRAGE DE LA BOITE MODALE (DÉTAILS D'UNE BIERE) + ANIMATION "FADE"
  // ----------------------------------------------------------------------

  const [show, setShow] = React.useState<boolean>(false);
  const [visibleDialog, setVisibleDialog] = React.useState<boolean>(false);
  const [showBeerDialog, setshowBeerDialog] = React.useState([]);

  // Affichage/Effacement de la boîte modale
  const onClick = () => {
    setShow(!show);
  };

  // Déclencheur de la boîte modale
  const toggleDialog = (datasDialogBeer?: any) => {
    datasDialogBeer = [datasDialogBeer];

    setshowBeerDialog(datasDialogBeer[0]);
    setVisibleDialog(!visibleDialog);
    onClick();
  };

  const children = show ? (
    <div className="content">
      <Dialog title={showBeerDialog["beerName"]} onClose={toggleDialog}>
        <p style={{ margin: "25px", textAlign: "center" }}>
          <span>
            <img
              height="200"
              alt={showBeerDialog["beerName"]}
              title={showBeerDialog["beerName"]}
              src={showBeerDialog["beerImgUrl"]}
            />
          </span>
          <br />
          <span>{showBeerDialog["beerDescription"]}</span>
        </p>

        <DialogActionsBar>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base mt-3 mb-1"
            onClick={toggleDialog}
          >
            Fermer
          </button>
        </DialogActionsBar>
      </Dialog>
    </div>
  ) : null;

  // ------------------------------------------------------------------
  // PARAMÈTRAGE ET APPEL DE LA BOITE MODALE AVEC LES DONNÉES DE L'API
  // ------------------------------------------------------------------

  const MyCommands = (props) => {
    let datasBeer = props.dataItem;
    return (
      <td className="k-command-cell">
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-edit-command k-i-plus">
          <span
            className="k-icon k-i-plus"
            onClick={() => toggleDialog(datasBeer)}
          ></span>
        </button>
      </td>
    );
  };

  // Ajout de l'URL de l'image de la bière
  const commandCell = (props: GridCellProps) => (
    <MyCommands {...props} imgBeerUrl={props.dataItem.beerImgUrl} />
  );

  // ---------------------------------------------------------------
  // PARAMÈTRAGE DU SWITCH (DEGRÉ D'ALCOOL)
  // ---------------------------------------------------------------

  const [checked, setChecked] = React.useState<boolean>(false);
  const alcoolLimitDegree = 8;

  // envoie d'une limite d'alcool à la requête Json
  const acoholLimit = (abv: number) => {
    pullJson(abv);
  };

  // Changement d'état du bouton "switch/toggle"
  const handleChange = (event: SwitchChangeEvent) => {
    let valueSwitch = event.target.value;
    valueSwitch ? acoholLimit(alcoolLimitDegree) : acoholLimit();
    setChecked(!checked);
  };

  // ---------------------------------------------------------------
  // PAGINATION DE LA GRILLE
  // ---------------------------------------------------------------

  const initialDataState: PageState = { skip: 0, take: 5 };
  const [page, setPage] = React.useState<PageState>(initialDataState);
  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  // ---------------------------------------------------------------
  // AFFICHAGE FINAL
  // ---------------------------------------------------------------

  return (
    <div className="App">
      <Slide transitionEnterDuration={500} transitionExitDuration={500}>
        {children}
      </Slide>

      <Grid
        data={arrayBeers.slice(page.skip, page.take + page.skip)}
        sortable={false}
        style={{ height: "100%" }}
        skip={page.skip}
        take={page.take}
        total={arrayBeers.length}
        pageable={true}
        onPageChange={pageChange}
        resizable={true}
      >
        <GridToolbar>
          <span> Uniquement sup. à 8% d'alcool ?</span>

          <Switch
            checked={checked}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onChange={handleChange}
            onLabel={"Oui"}
            offLabel={"Non"}
          />
        </GridToolbar>
        <GridColumn cell={commandCell} title="Détails" width="80px" />
        <GridColumn field="beerName" title="Marque" />
        <GridColumn field="beerTagline" title="Slogan" />
        <GridColumn field="beerAbv" title="Degré" />
      </Grid>
      <div>{visibleDialog && <Slide> {children} </Slide>}</div>
    </div>
  );
}

export default App;
