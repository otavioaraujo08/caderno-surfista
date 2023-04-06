import * as path from "path";
import moduleAlias from "module-alias";

// Configurando o caminho absoluto para os arquivos
const files = path.resolve(__dirname, "../..");

// Definindo os alias para os arquivos
moduleAlias.addAliases({
    "@src": path.join(files, "src"),
    "@test": path.join(files, "test"),
});
