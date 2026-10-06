import { Injectable, signal } from '@angular/core';
import { applyEach, email, form, required } from '@angular/forms/signals';

export interface PersonalData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
}

export interface EducationEntry {
  level: string;
  institution: string;
  status: string;
  year: string;
}

export interface CourseEntry {
  name: string;
}

export interface ResumeDraftModel {
  personalData: PersonalData;
  objective: {
    role: string;
    summary: string;
  };
  experience: {
    noExperience: boolean;
    entries: ExperienceEntry[];
  };
  education: EducationEntry[];
  courses: CourseEntry[];
  skills: string[];
  otherSkill: string;
}

export function createEmptyExperience(): ExperienceEntry {
  return {
    role: '',
    company: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    current: false,
    description: '',
  };
}

export function createEmptyEducation(): EducationEntry {
  return {
    level: '',
    institution: '',
    status: '',
    year: '',
  };
}

export function createEmptyCourse(): CourseEntry {
  return { name: '' };
}

@Injectable()
export class ResumeDraftService {
  private readonly model = signal<ResumeDraftModel>({
    personalData: {
      fullName: '',
      phone: '',
      email: '',
      location: '',
    },
    objective: {
      role: '',
      summary: '',
    },
    experience: {
      noExperience: false,
      entries: [createEmptyExperience()],
    },
    education: [createEmptyEducation()],
    courses: [createEmptyCourse()],
    skills: [],
    otherSkill: '',
  });

  readonly draft = this.model.asReadonly();

  readonly form = form(this.model, (path) => {
    required(path.personalData.fullName, {
      message: 'Informe seu nome completo.',
    });
    required(path.personalData.phone, {
      message: 'Informe um telefone para contato.',
    });
    email(path.personalData.email, {
      message: 'Confira o formato do e-mail.',
    });
    required(path.personalData.location, {
      message: 'Informe sua cidade e estado.',
    });

    required(path.objective.role, {
      message: 'Informe o cargo ou a área que procura.',
    });

    applyEach(path.experience.entries, (entry) => {
      required(entry.role, {
        message: 'Informe a função.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience),
      });
      required(entry.company, {
        message: 'Informe a empresa ou o local.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience),
      });
      required(entry.startMonth, {
        message: 'Selecione o mês de início.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience),
      });
      required(entry.startYear, {
        message: 'Selecione o ano de início.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience),
      });
      required(entry.description, {
        message: 'Conte um pouco sobre o que você fazia.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience),
      });
      required(entry.endMonth, {
        message: 'Selecione o mês de término.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience) && !valueOf(entry.current),
      });
      required(entry.endYear, {
        message: 'Selecione o ano de término.',
        when: ({ valueOf }) => !valueOf(path.experience.noExperience) && !valueOf(entry.current),
      });
    });

    applyEach(path.education, (entry) => {
      required(entry.level, { message: 'Informe sua escolaridade.' });
      required(entry.institution, { message: 'Informe a instituição.' });
      required(entry.status, { message: 'Informe a situação.' });
      required(entry.year, { message: 'Informe o ano ou a previsão.' });
    });
  });

  addExperience(): void {
    this.model.update((current) => ({
      ...current,
      experience: {
        ...current.experience,
        entries: [...current.experience.entries, createEmptyExperience()],
      },
    }));
  }

  removeExperience(index: number): void {
    this.model.update((current) => {
      if (current.experience.entries.length <= 1) {
        return current;
      }

      return {
        ...current,
        experience: {
          ...current.experience,
          entries: current.experience.entries.filter((_, itemIndex) => itemIndex !== index),
        },
      };
    });
  }

  addEducation(): void {
    this.model.update((current) => ({
      ...current,
      education: [...current.education, createEmptyEducation()],
    }));
  }

  removeEducation(index: number): void {
    this.model.update((current) => {
      return {
        ...current,
        education: current.education.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  }

  addCourse(): void {
    this.model.update((current) => ({
      ...current,
      courses: [...current.courses, createEmptyCourse()],
    }));
  }

  removeCourse(index: number): void {
    this.model.update((current) => {
      return {
        ...current,
        courses: current.courses.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  }
}
