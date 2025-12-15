// Importaciones adicionales necesarias
import { RouterExtensions } from '@angular/router';
import { action } from '@nativescript/core/ui/dialogs';
import { Toast } from 'nativescript-toasts'; // Plugin Toast
import { ArticleService, Article } from '../services/article.service';
// ... Mantener las otras importaciones (Redux, AppSettings)

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    // Asegúrate de definir las clases CSS 'favorite-icon' y 'is-favorite' 
    // en tu archivo .css para la animación/gesto.
})
export class HomeComponent implements OnInit {
    // ... propiedades existentes (searchQuery, articles, userName, readLaterIds$, etc.)

    constructor(
        private articleService: ArticleService,
        private store: Store<AppState>,
        private router: RouterExtensions // Inyectar RouterExtensions
    ) { }

    // ... ngOnInit() y search() existentes

    // 2. Navegación desde el listado a la vista de detalle
    goToDetails(id: number) {
        this.router.navigate(['/article', id]); // Usa RouterExtensions y navigate
    }

    // 3. Lógica para "Pull to Refresh"
    refreshList(args: any) {
        // Lógica para actualizar el listado desde un servicio
        this.articleService.searchArticles().subscribe(
            data => {
                // Aquí podrías agregar lógica para añadir elementos nuevos/aleatorios
                this.articles = data.map(a => ({...a, id: a.id * Math.random() })); // Simular nuevos
                args.object.notifyPullToRefreshFinished();
                this.showToast('Listado actualizado!'); // 5. Mostrar Toast
            },
            error => {
                console.error('Error al refrescar:', error);
                args.object.notifyPullToRefreshFinished();
                this.showToast('Error al actualizar el listado.', true);
            }
        );
    }
    
    // 5. Función para mostrar Toast
    showToast(message: string, isError: boolean = false) {
        Toast.show({
            text: message,
            duration: Toast.DURATION.SHORT,
            // Aquí puedes configurar colores si el plugin lo permite
        });
    }

    // 4. Diálogo de Acción (Action Dialog) para ingreso de información
    showActionDialog(item: Article) {
        let options = {
            title: "Seleccionar Categoría",
            message: `Categoría actual para "${item.title}"`,
            cancelButtonText: "Cancelar",
            actions: ["Deportes", "Noticias", "Tecnología"]
        };

        action(options).then((result) => {
            if (result !== options.cancelButtonText) {
                // Modificar un atributo del objeto subyacente
                item.category = result;
                this.showToast(`Categoría de ${item.title} cambiada a: ${result}`);
            }
        });
    }
    
    // 7. & 9. Detección de gestos (Long Press) -> se maneja llamando showActionDialog desde el HTML
    // El 'longPress' en el HTML ya está implementado.
}
