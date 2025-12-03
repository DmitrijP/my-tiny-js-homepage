# MyTinyJSFramework

In diesem Tutorial entwickeln wir ein eigenes JS Single Page Frontend Framework. 
Ziel davon ist es zu verstehen wie Angular, Vue, React... Frameworks funktionieren.


- [MyTinyJSFramework](#mytinyjsframework)
  - [Teil 1 Einstieg](#teil-1-einstieg)
    - [Verzeichnisstruktur](#verzeichnisstruktur)
    - [Custom Elements erstellen](#custom-elements-erstellen)
    - [Module Importieren / Exportieren](#module-importieren--exportieren)
    - [Run It](#run-it)
  - [Teil 2. HomePage](#teil-2-homepage)
    - [HomePage Template](#homepage-template)
    - [Die HomePage Klasse](#die-homepage-klasse)
    - [Import erweitern](#import-erweitern)
  - [Teil 3. Router](#teil-3-router)
    - [Die Routen](#die-routen)
    - [Der Router](#der-router)
      - [init()](#init)
      - [goTo(route)](#gotoroute)
    - [Aufruf des Routers](#aufruf-des-routers)
  - [Teil 4 AboutPage](#teil-4-aboutpage)
    - [Template](#template)
    - [AboutPage](#aboutpage)
    - [Routen](#routen)
  - [Teil 5 Node Web Server](#teil-5-node-web-server)
    - [server.js](#serverjs)
    - [Api](#api)
  - [Teil 6 BlogPage](#teil-6-blogpage)
    - [ClientApi](#clientapi)
    - [Blog Templates](#blog-templates)
    - [BlogEntry.js](#blogentryjs)
    - [BlogPage.js](#blogpagejs)
    - [Routen](#routen-1)
  - [Teil 7 Refactoring](#teil-7-refactoring)
    - [HomePage refactoring](#homepage-refactoring)
    - [Server Catch All](#server-catch-all)
    - [BaseComponent](#basecomponent)
    - [Blog](#blog)
      - [BlogEntry](#blogentry)
      - [BlogPage](#blogpage)
    - [routes.js](#routesjs)
  - [Teil 8 Navigation](#teil-8-navigation)
      - [History](#history)
  - [Teil 9](#teil-9)


## Teil 1 Einstieg
### Verzeichnisstruktur
Wir erstellen folgende Verzeichnisse:
```bash
|backend
|frontend
|-->|public
|-->|-->|components
|-->|-->|services
|-->|-->|static
```

Als nächstes erstellen wir die Datei **index.html** im *frontend/public* Verzeichnis.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dmitrij Patuk</title>
    <!-- damit machen wir den 404 Fehler weg -->
    <link rel="icon" href="data:," />
  </head>
  <body>
    <main>
        <!-- dies wird unser Einstiegspunkt in die App sein -->
        <app-component></app-component>
    </main>
  </body>
</html>
```

Nun benötigen wir noch eine **style.css** in *frontend/public/static*. Ich habe diese mit einigen Farben und einem Grundstyle befüllt.
Damit unsere Seite etwas besser aussieht als der Standard.

```css
:root {
  --white: #f9faff;
  --platinum: #e3e4e8;
  --windsurfing: #32779b;
  --marina: #5a91c7;
  --gray: #9a9a9a;
  --onyx: #3c3d44;
  --charcoal: #343c47;
  --dark-terminal: #1e1e2f;
  --accent-glow: #00d1b2;
  --corners: 24px 0;
  --base-font-size: 1rem;
  --transition: 0.3s ease;
}

/* Reset and base styles */
html {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-size: var(--base-font-size);
  font-family: "Inter", sans-serif;
  font-display: swap;
  background-color: var(--platinum);
  color: var(--onyx);
  margin: 0;
  line-height: 1.6;
}

/* Layout */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Typography */
h1 {
  font-size: calc(var(--base-font-size) * 2.9);
  margin: 0;
  font-weight: 700;
}

```

### Custom Elements erstellen

In dem nächsten Schritt werden wir unser erstes Component bauen.
Link zu [Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).

Components sind HTML Elemente die wir selbst erstellen können um diese dann wie gewohnt in unserem HTML Code verwenden zu können. 

Diese bestehen aus mehreren Teilen. Dem HTML, JS und CSS Code.
Zuerst werden wir ein leeres Element erstellen `<app-component>`.
Dafür erstellen wir eine neue Datei in dem Verzeichnis **frontend/public/components** mit dem Namen **AppComponent.js**.

```js
//hier exportieren wir unsere Klasse um diese von außerhalb der Datei verwenden zu können
export { AppComponent };

//Die Klasse muss HTMLElement erweitern
class AppComponent extends HTMLElement {
  constructor() {
    super();
  }
  //Dieses Event ist wichtig, da drin werden wir alles was unser Component macht definieren, aktuell log auf die Console
  connectedCallback() {
    console.log("We initialize the AppComponent. This is the start of the App and we use it as the container for our components.");
  }
}

//jetzt müssen wir das Component noch definieren, damit es im HTML verwendet werden kann
customElements.define("app-component", AppComponent);
```

Wir werden für jedes unserer Komponenten eine eigene Klasse erstellen die die selben Elemente enthällt. 

`connectedCallback()` ist eines der Events die das `HTMLElement` bereitstellt es wird jedes Mal aufgerufen wenn das Element im DOM positioniert wurde. Zb wenn es mit `appendChild()` irgendwo eingefügt wird. 
```js
document.body.appendChild(document.createElement("app-component"));
someDiv.appendChild(appComponent); 
```

### Module Importieren / Exportieren

Link zu [Modulen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Im nächsten Schritt importieren wir die Datei in unserem HTML Code mit 
```html
<script type="module" defer>
    import { AppComponent } from "./components/AppComponent.js";
</script>
```
Dabei ist es wichtig das wir den `type="module"` setzen, erst dann können wir Components verwenden.
Unser Script enthält in dem Fall einfach nur das Import der Klasse die wir im vorherigen Schritt erstellt haben.

Wenn wir das gemacht haben können wir das Component im `HTML` Code verwenden.

So sollte es jetzt aussehen:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dmitrij Patuk</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="./static/style.css" />
    <!--unser import-->
    <script type="module" defer>
      import { AppComponent } from "./components/AppComponent.js";
    </script>
  </head>
  <body>
    <!--die Komponente-->
    <app-component></app-component>
  </body>
</html>
```

### Run It

Jetzt benötigen wir einen Server mit dem wir die Seite Ausliefern. Der Browser wird keine lokale Auslieferung erlauben.
Wir bekommen eine CORS fehler wenn wir die HTML Datei im Browser öffnen.
```bash
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at file:///.../frontend/public/app.js. (Reason: CORS request not http).

Module source URI is not allowed in this document: “file:///.../frontend/public/app.js”.
```


Damit wir die Seite Rendern können benötigen wir eine Auslieferung durch einen Server. Ich habe mich für `node.js` entschieden.
Installiert die [Anwendung](https://nodejs.org/en) auf eurem Rechner.

Wir starten den Server aus der Konsole mit dem Befehl:
```bash
npx serve ./frontend/public
```
Dies sollte auf der Konsole ausgegeben werden:

```bash
┌────────────────────────────────────────────┐
│                                            │
│   Serving!                                 │
│                                            │
│   - Local:    http://localhost:3000        │
│   - Network:  http://192.168.178.73:3000   │
│                                            │
│   Copied local address to clipboard!       │
│                                            │
└────────────────────────────────────────────┘
```
Navigiert zu dieser Seite und es sollte eine Leere Seite gerendert werden. Mit der Consolenausgabe:

```bash
We initialize the AppComponent. This is the start of the App and we use it as the container for our components.
```

Damit haben wir unser erstes Component gebaut.

## Teil 2. HomePage

In diesem Teil bauen wir die erste Seite die in unserer single page application gerendert werden soll.

### HomePage Template

Als erstes benötigen wir ein HTML Template das wir in unserer HomePage Komponente rendern wollen. Dazu erweitern wir unsere **index.html** Datei.

Wir definieren ein neues Tag `<home-page></home-page>` in dem `<app-component> </app-component>` Tag. Aktuell existiert es noch nicht aber wir werden es gleich erstellen.

Dafür benötigen wir das Template dieses Components. Das erstellen wir in einem `<template></template>` Tag. Wir füllen es mit einem H1 und einem Paragraphen. Damit wir etwas sehen können wenn es gerendert wird.
```html
    <template id="home-template">
      <div class="wrapper">
        <h1>Home</h1>
        <article>
          <p>This is the Home Template</p>
        </article>
      </div>
    </template>
```

So sollte die Datei jetzt aussehen:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dmitrij Patuk</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="./static/style.css" />
    <script type="module" defer>
      import { AppComponent } from "./components/AppComponent.js";
    </script>
  </head>
  <body>
    <main>
      <app-component>
        <home-page></home-page>
      </app-component>
    </main>
    <!--############## TEMPLATES #############-->
    <template id="home-template">
      <div class="wrapper">
        <h1>Home</h1>
        <article>
          <p>This is the Home Template</p>
        </article>
      </div>
    </template>
  </body>
</html>
```

### Die HomePage Klasse
Nun bauen wir unsere zweite Component. Dazu erstellen wir eine weitere Datei **frontend/public/components/HomePage.js**

Sie enthält die selben Elemente wie unsere **AppComponent.js**.
Die `connectedCallback()` Methode selektiert unser vorher erstelltes Template aus der `index.html` Klont es und gibt es an die `render()` Methode weiter.
Diese definieren wir als `async render(content){}`. In der Methode fügen wir diesen HTML Code als Child unseres `HomePage` HTML Elements ein.
Dadurch wird es im Browser gerendert.

Die Datei sollte so aussehen:
```js
export { HomePage };

class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("OnConnectedCallback: home-page");
    var template = document.getElementById("home-template");
    var content = template.content.cloneNode(true);
    this.render(content);
  }

  async render(content) {
    console.log("Rendering home-page content");
    this.appendChild(content);
  }
}

customElements.define("home-page", HomePage);
```
### Import erweitern
Als letztes erweitern wir unser JavaScript in der `index.html`
```html
<script type="module" defer>
    import { AppComponent } from "./components/AppComponent.js";
    import { HomePage } from "./components/HomePage.js";
</script>
```

Die Datei sollte so aussehen:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dmitrij Patuk</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="./static/style.css" />
    <script type="module" defer>
        import { AppComponent } from "./components/AppComponent.js";
        import { HomePage } from "./components/HomePage.js";
    </script>
  </head>
  <body>
    <main>
      <app-component>
        <home-page></home-page>
      </app-component>
    </main>
    <!--############## TEMPLATES #############-->
    <template id="home-template">
      <div class="wrapper">
        <h1>Home</h1>
        <article>
          <p>This is the Home Template</p>
        </article>
      </div>
    </template>
  </body>
</html>
```

Wenn wir den Browser refreshen sollten wir jetzt den Inhalt des Templates sehen.

Dazu sollten folgender Text auf der Console ausgegeben werden
```bash
We initialize the AppComponent. This is the start of the App and we use it as the container for our components.
OnConnectedCallback: home-page
Rendering home-page content
```

## Teil 3. Router

In diesem Teil werden wir unseren Router bauen der das Rendern der einzelnen Seiten anhand der Adresse übernimmt welche im Browser aufgerufen wurde.

### Die Routen

Als erstes erstellen wir eine weitere Datei `frontend/public/services/routes.js`. Wir beginnen den Dateinamen mit einem LowerCase Buchstaben weil es keine Klasse ist.

Die Datei wird ein Array mit unseren Routen und den entsprechenden Komponenten, die gerendert werden sollen, enthalten.

Hier werden wir alle unsere Seiten importieren.
Somit ergiebt sich folgender Inhalt:
```js
import { HomePage } from "../components/HomePage.js";

export const Routes = [
  {
    path: "/",
    component: HomePage,
  },
];
```

### Der Router
Als nächstes erstellen wir eine weitere Datei `frontend/public/services/Router.js`.

Dieses wird ein JavaScript Object `Router` mit den Methoden `init()` und `goTo(route)` enthalten.
Zuerst importieren wir aber unsere Routen die wir vorher definiert haben.

#### init()
Init fügt ein `popstate` Listener hinzu. Dieser benachrichtig uns wenn in der Adressleiste des Browsers eine neue Adresse aufgerufen wurde.
Dadurch können wir die `goTo(route)` Methode mit der aktuellen Route aufrufen und somit die richtige Komponente rendern.
Dazu rufen wir am Ende der Methode goTo() mit dem aktuellen Pfad auf. Dies sorgt dafür das der erste Aufruf unserer Webseite richtig Navigiert.  
```js
init: () => {
window.addEventListener("popstate", () => {
    console.log("ROUTER -> OnPopstate: " + location.pathname);
    Router.goTo(location.pathname);
});

Router.goTo(location.pathname);
},
```

#### goTo(route)
Die Methode bekommt ein Pfad `index/app?id=3` und selektiert den Teil der unsere Komponente beschreibt. Dazu teilen wir den String am `?` in zwei teile um den Pfad und die Query zu bekommen.

Danach iterieren wir über unsere Routen bis wir eine Route mit dem Pfad gefunden haben der dem Pfad entspricht den wir vom Browser bekommen haben.
Wir instantiieren ein neues Objekt aus der Komponente und fügen diese in die `app-component` ein. Dadurch wird unsere Seite gerendert.
```js
goTo: (route) => {
    var path = "";
    var query = "";
    if (route.includes("?")) {
      var parts = route.split("?");
      path = parts[0];
      query = parts[1];
    } else {
      path = route;
    }
    var page = null;
    for (let r of Routes) {
      if (typeof r.path === "string" && r.path === path) {
        console.log("ROUTER -> goTo: " + path);
        page = new r.component();
        break;
      }
    }

    if (page) {
      document.querySelector("app-component").innerHTML = "";
      document.querySelector("app-component").appendChild(page);
    }
},
```

Die ganze Datei sollte jetzt so aussehen:
```js
import { Routes } from "./routes.js";
export { Router }
const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      console.log("ROUTER -> OnPopstate: " + location.pathname);
      Router.goTo(location.pathname);
    });

    Router.goTo(location.pathname);
  },

  // api/route/whatever?id=1&x=2
  goTo: (route) => {
    var path = "";
    var query = "";
    if (route.includes("?")) {
      var parts = route.split("?");
      path = parts[0];
      query = parts[1];
    } else {
      path = route;
    }
    var page = null;
    for (let r of Routes) {
      if (typeof r.path === "string" && r.path === path) {
        console.log("ROUTER -> goTo: " + path);
        page = new r.component();
        break;
      }
    }

    if (page) {
      document.querySelector("app-component").innerHTML = "";
      document.querySelector("app-component").appendChild(page);
    }
  },
};
```

### Aufruf des Routers
Jetzt erweitern wir nur noch das `<script>` Tag in der `index.html` um den Import des Routers und rufen die `Router.init();` Methode auf.
Dadurch registrieren wir uns für das `popstate` Event und rendern die `HomePage`
```html
<script type="module" defer>
    import { AppComponent } from "./components/AppComponent.js";
    import { Router } from "./services/Router.js";
    Router.init();
</script>
```
Wir können diese jetzt aus unserem `<app-component>` Tag entfernen. Den Import der `HomePage` benötigen wir hier auch nicht mehr. Er kann entfernt werden.

So sollte die Seite jetzt aussehen:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dmitrij Patuk</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="./static/style.css" />
    <script type="module" defer>
        import { AppComponent } from "./components/AppComponent.js";
        import { Router } from "./services/Router.js";
        Router.init();
    </script>
  </head>
  <body>
    <main>
      <app-component>
      </app-component>
    </main>
    <!--############## TEMPLATES #############-->
    <template id="home-template">
      <div class="wrapper">
        <h1>Home</h1>
        <article>
          <p>This is the Home Template</p>
        </article>
      </div>
    </template>
  </body>
</html>
```

Aktualisiert die Seite. Sie sollte weiterhin gerendert werden.

## Teil 4 AboutPage

In diesem Teil bauen wir unsere zweite Seite. 
### Template
Wie vorher auch benötigen wir erstmal ein Template. Dazu kopieren wir erstmal das `home-template` und ersetzen ein Paar Texte

```html
<template id="about-template">
    <div class="wrapper">
    <h1>About</h1>
    <article>
        <p>This is the About Template</p>
    </article>
    </div>
</template>
```
### AboutPage
Dann kopieren wir die `HomePage.js` Datei und passen diese so an das sie unser Template Rendert:

```js
export { AboutPage };

class AboutPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("OnConnectedCallback: about-page");
    var template = document.getElementById("about-template");
    var content = template.content.cloneNode(true);
    this.render(content);
  }

  async render(content) {
    console.log("Rendering about-page content");
    this.appendChild(content);
  }
}

customElements.define("about-page", AboutPage);
```
### Routen
Wir erweitern unsere Routen:

```js
import { HomePage } from "../components/HomePage.js";
import { AboutPage } from "../components/AboutPage.js";

export const Routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];
```

Wir aktualisieren unseren Browser und navigieren zu `/about`.
Leider liefert uns der Browser jetzt ein 404 zurück. Weil dieser nach dem ´about´ Endpunkt auf dem Server sucht. Dieser existiert aber nur in unserem Client im Browser. Somit funktioniert unser Router aktuell nur für `/` oder `/index.html`. 

Wir müssen dem Server erklähren das er für alle unbekannten Seiten einfach nur die `index.html` zurück liefern soll ab da übernimmt dann unser JavaScript Client. 

Wir beenden den Server mit `STRG + C` oder `CMD + C` und starten ihn mit folgendem Befehl neu:

```bash
npx serve -s ./frontend/public
```

Wenn wir jetzt zu `/about`navigieren sollte die `AboutPage` gerendert werden. Unser Router funktioniert.

## Teil 5 Node Web Server

In diesem Teil stellen wir unsere ersten Requests gegen den Server und Laden ein paar Daten um diese dann in unserer HomePage darzustellen.

### server.js

Wir erstellen eine neue Datei `/backend/src/server.js`. Diese Datei wird unseren Server enthalten der die App ausliefert und als API für unsere Requests dient.

Dies ist die Minimalkonfiguration die wir erstmal benötigen:
```js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../../frontend/public");

app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } 
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Wir wir sagen dem Server wo sich unsere App befindet und liefern die als StaticFiles aus.
Danach definieren wir ein CatchAll pfad der für alle Requests die nicht mit `/api` beginnen unsere `index.html` ausliefert.
Am Ende starten wir den Server mit `node ./src/server.js` und prüfen ob noch alles so funktioniert wie bisher. `HomePage` und `AboutPage` sollten weiterhin aufrufbar sein.

### Api

Unsere Webseite soll ein Blog anbieten in dem wir Blogeintrage veröffentlichen möchten. Dafür werden wir einen API Endpunkt implementieren.
Als erstes erstellen wir ein `backend/src/api/BlogEntryDTO.js`

```js
export class BlogEntryDTO {
  constructor({ id, title, body, thumbnail, tags }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.thumbnail = thumbnail;
    this.tags = tags;
  }
}
```

Danach erweitern wir unsere `CatchAll` Route um den Aufruf der `next();` methode. Dies lässt sorgt dafür das unser Server bei einem Pfad der mit `/api` beginnt die nächste Middleware aufruft. Also unseren nächsten Requesthandler.

```js
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next(); //<--wenn pfad mit /api startet dann fahre mit nächstem Handler fort.
  }
});
```

Als letztes bauen wir den nächsten Handler. Dieser reagiert auf `api/blog` und liefert eine statische Liste der `BlogEntryDTOs` zurück

```js
app.use("api/blog", (req, res)=>{
    res.json([
        new BlogEntryDTO({
            id: 1,
            title: "Artikel 1",
            body: "Lorem ipsum",
            thumbnail: "https://images.de/image123",
            tags: ["Tag A", "Tag B", "Tag C"],
        }),
        new BlogEntryDTO({
            id: 2,
            title: "Artikel 2",
            body: "Lorem ipsum",
            thumbnail: "https://images.de/image223",
            tags: ["Tag 1", "Tag 2", "Tag 3"],
        })
    ])
})
```

Die `server.js` Dateil sollte jetzt so aussehen:

```js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { BlogEntryDTO } from "./BlogEntryDTO.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../../frontend/public");

app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next(); //<--wenn pfad mit /api startet dann fahre mit nächstem Handler fort.
  }
});

app.use("api/blog", (req, res)=>{
    res.json([
        new BlogEntryDTO({
            id: 1,
            title: "Artikel 1",
            body: "Lorem ipsum",
            thumbnail: "https://images.de/image123",
            tags: ["Tag A", "Tag B", "Tag C"],
        }),
        new BlogEntryDTO({
            id: 2,
            title: "Artikel 2",
            body: "Lorem ipsum",
            thumbnail: "https://images.de/image223",
            tags: ["Tag 1", "Tag 2", "Tag 3"],
        })
    ])
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Am Ende starten wir den Server mit `node ./src/server.js` und prüfen ob noch alles so funktioniert wie bisher. `HomePage` und `AboutPage` sollten weiterhin aufrufbar sein. 
Zusätzlich sollten wir unter `/api/blog` jetzt unsere zwei Blogeinträge als JSON geliefert bekommen.

## Teil 6 BlogPage
In diesem Teil bauen wir die `BlogPage`. Diese soll eine Liste unserer Blogeinträge anzeigen.

### ClientApi
Dafür erstellen wir eine neue Datei `frontend/public/services/BlogClient.js`
Diese hat eine Property `baseUri` die auf unseren Server zeigt und eine Methode `getBlog()` mit der wir die Liste von unserem Server mit einem `fetch()` abrufen
und als JSON zurück geben.
```js
export const BlogClient = {
  baseUri: "http://localhost:3000",
  getBlog: async () => {
    try {
      const url = `${BlogClient.baseUri}/api/blog`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
```

### Blog Templates

Wie bei den bisherigen Seiten erstellen wir ein Template in der `index.html`.
Unser erstes template wird das `blog-entry-template` dieses ist dafür Verantwortlich ein Blogeintrag anzuzeigen.

```html
<template id="blog-entry-template">
    <div class="wrapper">
        <article>
            <h3>Title</h3>
            <ul>
                <li>Tag 1</li>
            </ul>
            <p>Blog Short Text</p>
            <img src="#" alt="blog-image" />
            <a href="#">Details</a>
        </article>
    </div>
</template>
```

Als nächstes erstellen wir das `blog-page-template` welches die Blog Seite darstellen wird.
Dieses zeigt ein Titel, etwas Text und eine Liste der `<blog-entry>` Elemente an.
```html
<template id="blog-template">
    <div class="wrapper">
    <h1>Blog</h1>
    <p>Willkommen auf meinem Blog.</p>
        <div class="blog-entries-container">
            <ul>
                <li>
                    <blog-entry></blog-entry>
                </li>
            </ul>
        </div>
    </div>
</template>
```
### BlogEntry.js

Jetzt wird es zeit für etwas JavaScript. Wir erstellen ein `/frontend/public/components/BlogEntry.js` Blogentry stellt ein Eintrag innerhalb des Blogs dar.

Dieses Element definiert eine interne Variable `_data` und ein Setter für diese Variable die nach dem Setzen direkt `render()` aufruft um das Element mit dem Inhalt zu rendern.

`connectedCallback()` püft ob `_data` gesetzt ist und ruft dann render() auf.

`render()` holt sich das Template und befüllt die einzelnen Elemente mit den Daten.
```js
export class BlogEntry extends HTMLElement {
  constructor() {
    super();
    this._data = null;
  }

  set data(dto) {
    console.log("BlogEntry: set data");
    this._data = dto;
    this.render();
  }

  connectedCallback() {
    console.log("BlogEntry: connectedCallback");
    if (this._data) this.render();
  }

  async render() {
    console.log("BlogEntry: render");
    if (!this._data) return;
    this.innerHTML = "";

    const template = document.getElementById("blog-entry-template");
    const node = template.content.cloneNode(true);

    node.querySelector("h3").textContent = this._data.title;

    let end = 100;
    if (this._data.body.length < end) {
      end = this._data.body.length;
    }
    node.querySelector("p").textContent = this._data.body.slice(0, end);

    node.querySelector("img").src = this._data.thumbnail;
    node.querySelector("a").href = `/api/blog?id=${this._data.id}`;

    let ul = node.querySelector("ul");
    ul.textContent = "";
    for (let tag of this._data.tags) {
      const li = document.createElement("li");
      li.textContent = tag;
      ul.appendChild(li);
    }
    this.appendChild(node);
  }
}

customElements.define("blog-entry", BlogEntry);
```

### BlogPage.js

Jetzt bauen wir die eigentliche `BlogPage.js` die die einzelnen Entries enthalten wird.
Wir importieren den `BlogClient` und rufen diesen in `connectedCallback` auf um die BlogEinträge abzuholen, die geben wir dann and die `render()` Methode weiter.
Hier rendern wir mit einer ForSchleife die einzelnen Elemente.

```js
import { BlogClient } from "../services/BlogClient.js";

export class BlogPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    console.log("BLOGPAGE: connectedCallback");
    let blog = await BlogClient.getBlog();
    this.render(blog);
  }

  async render(blog) {
    console.log("BLOGPAGE: Rendering");
    const template = document.getElementById("blog-template");
    const node = template.content.cloneNode(true);

    const container = node.querySelector(".blog-entries-container ul");
    container.textContent = "";
    blog.forEach((entry) => {
      console.log(`BLOGPAGE: Entry`);
      console.log(entry);
      const item = document.createElement("blog-entry");
      item.data = entry;
      const li = document.createElement("li");
      li.appendChild(item);
      container.appendChild(li);
    });

    this.appendChild(node);
  }
}

customElements.define("blog-page", BlogPage);
```

### Routen

Als letztes müssen wir noch die Routen anpassen, indem wir die `/blog` Route hinzufügen die die `BlogPage` rendert. Vergesst es nicht die `BlogEntry` zu importieren sonst wird die Seite nicht gerendert.

```js
import { HomePage } from "../components/HomePage.js";
import { AboutPage } from "../components/AboutPage.js";
import { BlogPage } from "../components/BlogPage.js";
import { BlogEntry } from "../components/BlogEntiry.js";

export const Routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/blog",
    component: BlogPage,
  },
];
```

Am Ende starten wir den Server mit `node ./src/server.js` neu und prüfen ob noch alles so funktioniert wie bisher. `HomePage`, `AboutPage` und `/api/blog` sollten weiterhin aufrufbar sein. 
Zusätzlich sollten wir unter `/blog` unsere zwei Blogeinträge als Liste gerendert bekommen.


## Teil 7 Refactoring

Es ist an der Zeit unseren Code zu refactoren da es jetzt unübersichtlich wird. Wir fangen damit an das wir uns überlegen wie unsere neue Struktur aussehen soll.

Dies war unsere Verzeichnisstruktur:
```bash
|backend
|frontend
|-->|public
|-->|-->|components
|-->|-->|services
|-->|-->|static
```

Ich möchte diese folgender weise erweitern:
```bash
|backend
|frontend
|-->|public
|-->|-->|components
|-->|-->|-->|home-page
|-->|-->|-->|-->|home-page.js
|-->|-->|-->|-->|home-page.css
|-->|-->|-->|-->|home-page.html
|-->|-->|-->|home-page
|-->|-->|-->|-->|home-page.js
|-->|-->|-->|-->|home-page.css
|-->|-->|-->|-->|home-page.html
|-->|-->|-->|-->|home-page-item
|-->|-->|-->|-->|-->|home-page-item.js
|-->|-->|-->|-->|-->|home-page-item.css
|-->|-->|-->|-->|-->|home-page-item.html
|-->|-->|services
|-->|-->|static
```
Dadurch können wir die Templates und Styles pro Seite gruppieren und schaffen so mehr Übersicht.

### HomePage refactoring

Erstmal erstellen wir die Struktur, in dem wir die drei Dateien anlegen:
- `/frontend/public/components/home-page/home-page.js`
- `/frontend/public/components/home-page/home-page.html`
- `/frontend/public/components/home-page/home-page.css`

Wir kopieren das Template in die .html Datei, die `Template` Tags können wir weg lassen:
```html
<div class="wrapper">
  <h1>Home</h1>
  <article>
    <p>This is the Home Template</p>
  </article>
</div>
```

Gleiches machen wir mit der css Datei:

```css
.wrapper {
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}
```

und die JS Datei.
Wobei wir bei der HomePage.js noch einiges anpassen müssen.
Wir müssen erstmal ein `ShadowDom` erstellen in dem unser Template und CSS gekapselt wird so das externe Elemente kein Einfluss darauf haben. Dies geschieht im `constructor()` danach rufen wir `load()` auf.

Load lädt die zwei Dateien (`css/html`) vom Server und extrahiert den Text in eigene Variablen.
Danach erstellen wir ein `Template` und weisen diesem das CSS sowie HTML zu.
```js
export class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.load();
  }

  async load() {
    const html = await fetch(new URL("./home-page.html", import.meta.url))
      .then(r => r.text());

    const css = await fetch(new URL("./home-page.css", import.meta.url))
      .then(r => r.text());

    const template = document.createElement("template");
    template.innerHTML = `<style>${css}</style>${html}`;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("HomePage connected to DOM");
  }
}

customElements.define("home-page", HomePage);
```

Gleiches können wir für die anderen Dateien tun. Wir ignorieren diese aber erstmal da wir unseren Server anpassen müssen.

### Server Catch All
Wenn wir den Server neu starten und die HomePage laden, wird diese nicht dargestellt. Was wir stattdessen sehen ist die gesammte SPA im ShadowDOM.
Dies passiert weil unsere Catch All Route den Download von Dateien nicht zulässt, da sie immer auf `/index.html` umleitet.

Wir beheben dies mit dieser Catch All Route. 
```js
//*all means that the route will be assigned to a parameter named all
app.all("*all", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
```
So sollte die `server.js` jetzt aussehen:
```js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { blogEntryMiddleware } from "./api/blogEntries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../../frontend/public");

app.use(express.json());

app.use(express.static(frontendPath));

app.use("/api/blog", blogEntryMiddleware);

app.all("*all", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

```
Startet den Server neu und probiert es aus die HomePage sollte noch immer funktionieren.

### BaseComponent
Wir könnten jetzt den Programmcode der HomePage in alle anderen Componenten kopieren, einfacher ist es aber den Code in eine eigene Superklasse zu exportieren.
Eine neue Klasse die für uns die .css und .html Dateien automatisch lädt und in den DOM einbindet.

Wir erwarten über den Constructor die URL der Child Klasse und speichern die Intern. Dann laden wir anhand dem Constructor Namen die zwei Template Dateien mit der `load()` Methode.

Diese benötigt eine `toKebabCase` Methode um unseren Klassennamen in den entsprechenden Dateinamen umzuwandeln.

Danach fahren wir wie bei der HomePage vor und laden die zwei Dateien herunter. Weisen die dem ShadowRoot zu und rufen eine `onReady()` Methode auf.
Diese Methode existiert nicht, wenn sie aber im Child existiert können wir dort das Rendern der Komponente fortführen.
```js
export class BaseComponent extends HTMLElement {
  constructor(childUrl) {
    super();
    this.attachShadow({ mode: "open" });

    const url = new URL("./", childUrl);
    this.log(url);
    this._componentDir = url;

    const name = this.constructor.name;
    this.load(name);
  }

  async load(name) {
    const baseURL = import.meta.url.replace(/[^\/]+$/, "");
    const kebabName = this.toKebabCase(name);
    const htmlURL = new URL(`./${kebabName}.html`, this._componentDir);
    this.log(htmlURL);
    const cssURL = new URL(`./${kebabName}.css`, this._componentDir);
    this.log(cssURL);
    const [html, css] = await Promise.all([
      fetch(htmlURL).then((r) => r.text()),
      fetch(cssURL).then((r) => r.text()),
    ]);

    this.log("template files fetched");
    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    this.shadowRoot.appendChild(styleEl);

    const template = document.createElement("template");
    template.innerHTML = html;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.onReady?.();
  }

  log(message, ...args) {
    const name = this.constructor.name || "BaseComponent";
    const time = new Date().toLocaleTimeString();
    console.log(`[${time} - ${name}] ${message}`, ...args);
  }

  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
}
```

Diese Klasse müssen wir jetzt in unserer `home-page.js` erben:

```js
import { BaseComponent } from "../BaseComponent.js";

export class HomePage extends BaseComponent {
  constructor() {
    super(import.meta.url);
  }
  onReady() {
    this.log("OnReady called");
  }
}

customElements.define("home-page", HomePage);
```

Wie man sieht ist der code extrem geschrumpft. Verfahrt analog mit der AboutPage.

### Blog
Beim Blog wird es etwas komplexer.
Wir erstellen erstmal die Dateien:

- `/frontend/public/components/blog-page/blog-page.js`
- `/frontend/public/components/blog-page/blog-page.html`
- `/frontend/public/components/blog-page/blog-page.css`
- `/frontend/public/components/blog-page/blog-entry/blog-entry.js`
- `/frontend/public/components/blog-page/blog-entry/blog-entry.html`
- `/frontend/public/components/blog-page/blog-entry/blog-entry.css`

#### BlogEntry

Als erstes beginnen wir mit der `BlogEntry` wir kopieren das HTML und CSS in die entsprechenden Dateien.

Zuerst das HTML
```html
<article class="blog-entry">
  <img class="thumb" src="#" alt="blog-image" />
  <div class="info">
    <h3 class="title">Blog Title</h3>
    <ul class="tags">
      <li>Tag 1</li>
    </ul>
    <p class="content">Short text…</p>
    <a class="details" href="#">Details</a>
  </div>
</article>
```
Dann das CSS
```css
:root {
  --marina: #5a91c7;
}

.blog-entry {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

.thumb {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.content {
  flex: 1;
}

.title {
  margin: 0;
  font-size: 1.2rem;
}

.body {
  color: #555;
}

ul {
  display: flex;
  gap: 8px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  background: #eee;
  padding: 5px 10px;
  border-radius: 8px;
  display: inline;
  color: var(--marina);
}
```
Jetzt muss nur noch die Klasse angepasst werden. Wir verwenden erneut die BaseComponent als Superklasse. `set data(dto)` setzt in diesem Fall nur die Daten. Das Rendering wird in `onReady()`gemacht.
Hier selectieren wir die entsprechenden Elemente im shadow und setzen diese mit den Werten aus dem `_data` Objekt.

```js
import { BaseComponent } from "../../BaseComponent.js";

export class BlogEntry extends BaseComponent {
  constructor() {
    super(import.meta.url);
    this._data = null;
  }

  set data(dto) {
    this.log("BlogEntry: set data");
    this._data = dto;
  }

  onReady() {
    this.log("BlogEntry: render");
    if (!this._data) return;
    this.shadowRoot.querySelector("h3.title").textContent = this._data.title;
    this.shadowRoot.querySelector("p.content").textContent = this._data.body;
    this.shadowRoot.querySelector("img").src = this._data.thumbnail;
    this.shadowRoot.querySelector("a").href = `/blog/${this._data.id}`;

    for (let tag of this._data.tags) {
      const li = document.createElement("li");
      li.textContent = tag;
      this.shadowRoot.querySelector("ul").appendChild(li);
    }

    this.shadowRoot.querySelector("h3").textContent = "";
    this.shadowRoot.querySelector("h3").textContent = this._data.title;
  }
}

customElements.define("blog-entry", BlogEntry);
```
Damit ist die BlogEntry fertig, nun folgt noch die Parent Seite.

#### BlogPage
Bei der BlogPage gehen wir analog vor.
Erst das HTML aus der `index.html` kopieren.
```html
<div class="wrapper">
  <h1>Blog</h1>
  <p>Willkommen auf meinem Blog.</p>
  <div class="blog-entries-container">
    <ul>
      <li>
        <blog-entry></blog-entry>
      </li>
    </ul>
  </div>
</div>
```

Dann das CSS.
```css
.wrapper {
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
```

Zuletzt noch die JS hier müssen wir die `blog-entry.js` importieren.
In `onReady()` laden wir die BlogEinträge und generieren die einzelnen Listeneinträge von `blog-entry` Elementen, die wir in die Liste legen.
```js
import { BlogClient } from "../../services/BlogClient.js";
import { BaseComponent } from "../BaseComponent.js";
import { BlogEntry } from "./blog-entry/blog-entry.js";

export class BlogPage extends BaseComponent {
  constructor() {
    super(import.meta.url);
  }

  async onReady() {
    this.log("OnReady called");
    let blog = await BlogClient.getBlog();
    let container = this.shadowRoot.querySelector(".blog-entries-container ul");
    container.textContent = "";
    blog.forEach((entry) => {
      this.log(`BLOGPAGE: Entry`);
      const item = document.createElement("blog-entry");
      item.data = entry;
      const li = document.createElement("li");
      li.appendChild(item);
      container.appendChild(li);
    });
  }
}

customElements.define("blog-page", BlogPage);
```

### routes.js
Jetzt muss nur noch die `routes.js` angepasst werden.

```js
import { HomePage } from "../components/home-page/home-page.js";
import { AboutPage } from "../components/about-page/about-page.js";
import { BlogPage } from "../components/blog-page/blog-page.js";
import { AppComponent } from "../components/AppComponent.js";

export const Routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/blog",
    component: BlogPage,
  },
];
```

Danach müssen wir die nicht mehr benötigten Daten und Einträge in der HTML Datei löschen wenn nicht bereits geschehen.
Somit haben wir unserer Anwendung refactored und für die nachfolgenden Features bereit gemacht.

Die Anwendung sollte weiterhin wie bisher funktionieren.

## Teil 8 Navigation

In diesem Teil implementieren wir eine einfache Navigationsleiste.
Als erstes setzen wir den Header in unsere `index.html` ein.
```html
<header>
  <div class="wrapper">
    <nav class="terminal-navbar">
      <ul>
        <li>
          <a href="/" class="navlink"
            >&gt; Home<span class="cursor">|</span></a
          >
        </li>
        <li><a href="/blog" class="navlink">&gt; Blog</a></li>
        <li><a href="/about" class="navlink">&gt; About</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Und das CSS in unsere `index.css`.
```css
/* Terminal Navigation */
.terminal-navbar {
  border-radius: var(--corners);
  background-color: var(--dark-terminal);
  padding: 12px 24px;
  font-family: "Courier New", monospace;
  box-shadow: inset 0 -2px 4px rgba(0, 209, 178, 0.4);
  margin-bottom: 2rem;
}

.terminal-navbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

.terminal-navbar li a {
  color: var(--windsurfing);
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  position: relative;
  padding-bottom: 2px;
  transition: color var(--transition);
}

.terminal-navbar li a:hover,
.terminal-navbar li a:focus {
  color: #fff;
}

.terminal-navbar li a:focus {
  outline: 2px solid var(--accent-glow);
  outline-offset: 2px;
}
```

Als letztes müssen wir nur noch unseren `Router.js` erweitern. Dieser Code Schnipsel kommt an den Anfang der `init()` Methode.
Damit fügen wir an jeden `navlink` ein `clickListener` der die Default Navigation unterdrück und stattdessen unseren Router verwendet.
```js
document.querySelectorAll("a.navlink").forEach((a) => {
  a.addEventListener("click", (event) => {
    event.preventDefault();
    const href = a.getAttribute("href");
    Router.goTo(href);
  });
});
```
#### History
Damit unserere App wie erwartet im Browser funktioniert müssen wir dafür sorgen das die History des Browsers beschrieben wird das machen wir mit folgendem Schnipsel am Anfang der `goTo()` Methode.
```js
if (addToHistory) {
  history.pushState(null, "", route);
}
```
Damit pushen wir die aktuelle Route in die Browser History. Somit funktioniert jetzt der Refresh Button wie erwartet und die Navigationsleiste wird richtig beschrieben.

Der Router sollte jetzt so aussehen
```js
import { Routes } from "./routes.js";

export const Router = {
  init: () => {
    //when a navlink is clicked
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = a.getAttribute("href");
        Router.goTo(href);
      });
    });

    //when navigation in navbar
    window.addEventListener("popstate", () => {
      console.log("ROUTER -> OnPopstate: " + location.pathname);
      Router.goTo(location.pathname);
    });

    //initial
    Router.goTo(location.pathname);
  },

  // api/route/whatever?id=1&x=2
  goTo: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }

    var path = "";
    var query = "";
    if (route.includes("?")) {
      var parts = route.split("?");
      path = parts[0];
      query = parts[1];
    } else {
      path = route;
    }
    var page = null;
    for (let r of Routes) {
      if (typeof r.path === "string" && r.path === path) {
        console.log("ROUTER -> goTo: " + path);
        page = new r.component();
        break;
      }
    }

    if (page) {
      document.querySelector("app-component").innerHTML = "";
      document.querySelector("app-component").appendChild(page);
    }
  },
};
```

Testet ob die Navigation weiterhin richtig funktioniert.

## Teil 9