//Create NgModule for AppModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { AppRoutingModule } from './app.routes.module';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ChartModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  declarations: [AppComponent, HomeComponent, TableComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
