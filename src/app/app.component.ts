import { Component, OnInit } from '@angular/core';
import { SeriesService } from './services/serie.service';
import { Series } from './models/serie';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  series = {} as Series;
  seriesList: Series[] | undefined;

  constructor(private carService: SeriesService) {}

  ngOnInit() {
    this.getSerie();
  }

  // defini se um carro será criado ou atualizado
  saveSerie(form: NgForm) {
    if (this.series.id !== undefined) {
      this.carService.updateSerie(this.series).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.carService.saveSerie(this.series).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getSerie() {
    this.carService.getSerie().subscribe((res: Series[]) => {
      this.seriesList = res;
    });
  }

  // deleta um carro
  deleteSerie(series: Series) {
    this.carService.deleteSerie(series).subscribe(() => {
      this.getSerie();
    });
  }

  // copia o carro para ser editado.
  editSerie(series: Series) {
    this.series = { ...series };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getSerie();
    form.resetForm();
    this.series = {} as Series;
  }

}
