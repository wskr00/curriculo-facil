import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResumeDraftService } from './resume-draft.service';

describe('ResumeDraftService', () => {
  let service: ResumeDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ResumeDraftService] });
    service = TestBed.inject(ResumeDraftService);
  });

  it('starts with one editable experience, education, and course entry', () => {
    expect(service.draft().experience.entries).toHaveLength(1);
    expect(service.draft().education).toHaveLength(1);
    expect(service.draft().courses).toHaveLength(1);
    expect(service.draft().skills).toEqual([]);
  });

  it('requires core personal and objective fields while keeping email optional', () => {
    expect(service.form.personalData.fullName().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe seu nome completo.' }),
    );
    expect(service.form.personalData.phone().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe um telefone para contato.' }),
    );
    expect(service.form.personalData.location().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe sua cidade e estado.' }),
    );
    expect(service.form.objective.role().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe o cargo ou a área que procura.' }),
    );
    expect(service.form.personalData.email().errors()).toEqual([]);
  });

  it('accepts an empty optional email and rejects a malformed one', () => {
    const emailField = service.form.personalData.email();

    emailField.value.set('');
    expect(emailField.errors()).toEqual([]);

    emailField.value.set('email-invalido');
    expect(emailField.errors()).toContainEqual(
      expect.objectContaining({ message: 'Confira o formato do e-mail.' }),
    );

    emailField.value.set('pessoa@example.test');
    expect(emailField.errors()).toEqual([]);
  });

  it('requires details for each experience unless the person has not worked yet', () => {
    const experience = service.form.experience.entries[0];

    expect(experience.role().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe a função.' }),
    );
    expect(experience.startMonth().errors()).toContainEqual(
      expect.objectContaining({ message: 'Selecione o mês de início.' }),
    );
    expect(experience.endMonth().errors()).toContainEqual(
      expect.objectContaining({ message: 'Selecione o mês de término.' }),
    );

    experience.current().value.set(true);
    expect(experience.endMonth().errors()).toEqual([]);
    expect(experience.endYear().errors()).toEqual([]);

    service.form.experience.noExperience().value.set(true);
    expect(experience.role().errors()).toEqual([]);
  });

  it('requires the fields of an added education entry but leaves courses optional', () => {
    const education = service.form.education[0];

    expect(education.level().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe sua escolaridade.' }),
    );
    expect(education.institution().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe a instituição.' }),
    );
    expect(education.status().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe a situação.' }),
    );
    expect(education.year().errors()).toContainEqual(
      expect.objectContaining({ message: 'Informe o ano ou a previsão.' }),
    );
    expect(service.form.courses[0].name().errors()).toEqual([]);
  });

  it('rejects an experience whose end month is before its start month', () => {
    const experience = service.form.experience.entries[0];
    experience.startMonth().value.set('6');
    experience.startYear().value.set('2024');
    experience.endMonth().value.set('5');
    experience.endYear().value.set('2024');

    expect(experience.endYear().errors()).toContainEqual(
      expect.objectContaining({
        kind: 'experienceDateOrder',
        message: 'A data final deve ser igual ou posterior à data inicial.',
      }),
    );
  });

  it('does not require an end date for current work or details when there is no experience', () => {
    const experience = service.form.experience.entries[0];

    experience.startMonth().value.set('6');
    experience.startYear().value.set('2024');
    experience.current().value.set(true);
    expect(experience.endMonth().errors()).toEqual([]);
    expect(experience.endYear().errors()).toEqual([]);

    service.form.experience.noExperience().value.set(true);
    expect(experience.role().errors()).toEqual([]);
    expect(experience.company().errors()).toEqual([]);
    expect(experience.startMonth().errors()).toEqual([]);
    expect(experience.startYear().errors()).toEqual([]);
    expect(experience.description().errors()).toEqual([]);
  });

  it('adds and removes entries without allowing the last experience entry to be removed', () => {
    service.removeExperience(0);
    expect(service.draft().experience.entries).toHaveLength(1);

    service.addExperience();
    expect(service.draft().experience.entries).toHaveLength(2);

    service.removeExperience(0);
    expect(service.draft().experience.entries).toHaveLength(1);
  });

  it('allows optional education and course lists to be empty', () => {
    service.removeEducation(0);
    service.removeCourse(0);

    expect(service.draft().education).toEqual([]);
    expect(service.draft().courses).toEqual([]);
  });
});
