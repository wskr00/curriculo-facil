import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'curriculo/dados-pessoais',
  },
  {
    path: 'curriculo',
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
        data: { step: 1 },
        loadComponent: () =>
          import('./pages/resume-builder/steps/personal-data-page/personal-data-page.component').then(
            (page) => page.PersonalDataPageComponent,
          ),
      },
      {
        path: 'objetivo',
        title: 'Objetivo profissional | Currículo Fácil',
        data: { step: 2, backLink: '/curriculo/dados-pessoais' },
        loadComponent: () =>
          import('./pages/resume-builder/steps/objective-page/objective-page.component').then(
            (page) => page.ObjectivePageComponent,
          ),
      },
      {
        path: 'experiencias',
        title: 'Experiências | Currículo Fácil',
        data: { step: 3, backLink: '/curriculo/objetivo' },
        loadComponent: () =>
          import('./pages/resume-builder/steps/experience-page/experience-page.component').then(
            (page) => page.ExperiencePageComponent,
          ),
      },
      {
        path: 'formacao',
        title: 'Formação | Currículo Fácil',
        data: { step: 4, backLink: '/curriculo/experiencias' },
        loadComponent: () =>
          import('./pages/resume-builder/steps/education-page/education-page.component').then(
            (page) => page.EducationPageComponent,
          ),
      },
      {
        path: 'cursos-e-habilidades',
        title: 'Cursos e habilidades | Currículo Fácil',
        data: { step: 5, backLink: '/curriculo/formacao' },
        loadComponent: () =>
          import('./pages/resume-builder/steps/courses-and-skills-page/courses-and-skills-page.component').then(
            (page) => page.CoursesAndSkillsPageComponent,
          ),
      },
      {
        path: 'revisao',
        title: 'Revisão do currículo | Currículo Fácil',
        data: { step: 6, backLink: '/curriculo/cursos-e-habilidades', showPreview: false },
        loadComponent: () =>
          import('./pages/resume-builder/steps/review-page/review-page.component').then(
            (page) => page.ReviewPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'curriculo/dados-pessoais',
  },
];
