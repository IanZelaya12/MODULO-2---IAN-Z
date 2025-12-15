// app.module.ts
import { MinLengthValidator } from './directives/min-length.directive';
// ...

@NgModule({
    declarations: [
        // ... otros componentes,
        MinLengthValidator // <--- Declarar aquí
    ],
    // ...
})
export class AppModule { }
