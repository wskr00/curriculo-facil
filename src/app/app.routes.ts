import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'curriculo/novo/dados-pessoais',
  },
  {
    path: 'curriculo/novo',
    loadComponent: () =>
      import('./pages/resume-builder/resume-builder-layout/resume-builder-layout.component').then(
        (page) => page.ResumeBuilderLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dados-pessoais',
      },
      {
        path: 'dados-pessoais',
        title: 'Dados pessoais | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/personal-data-page/personal-data-page.component').then(
            (page) => page.PersonalDataPageComponent,
          ),
      },
      {
        path: 'objetivo',
        title: 'Objetivo profissional | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/objective-page/objective-page.component').then(
            (page) => page.ObjectivePageComponent,
          ),
      },
      {
        path: 'experiencias',
        title: 'Experiências | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/experience-page/experience-page.component').then(
            (page) => page.ExperiencePageComponent,
          ),
      },
      {
        path: 'formacao',
        title: 'Formação | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/education-page/education-page.component').then(
            (page) => page.EducationPageComponent,
          ),
      },
      {
        path: 'cursos-e-habilidades',
        title: 'Cursos e habilidades | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/courses-and-skills-page/courses-and-skills-page.component').then(
            (page) => page.CoursesAndSkillsPageComponent,
          ),
      },
      {
        path: 'revisao',
        title: 'Revisão do currículo | Currículo Fácil',
        loadComponent: () =>
          import('./pages/resume-builder/steps/review-page/review-page.component').then(
            (page) => page.ReviewPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'curriculo/novo/dados-pessoais',
  },
];
