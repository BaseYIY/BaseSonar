/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @flow
import { isNil, omitBy } from 'lodash';

export type RawQuery = { [string]: string };

export type Query = {|
  assigned: boolean,
  assignees: Array<string>,
  authors: Array<string>,
  createdAfter: string,
  createdAt: string,
  createdBefore: string,
  createdInLast: string,
  directories: Array<string>,
  files: Array<string>,
  languages: Array<string>,
  modules: Array<string>,
  projects: Array<string>,
  resolved: boolean,
  resolutions: Array<string>,
  rules: Array<string>,
  severities: Array<string>,
  sinceLeakPeriod: boolean,
  statuses: Array<string>,
  tags: Array<string>,
  types: Array<string>
|};

export type Paging = {
  pageIndex: number,
  pageSize: number,
  total: number
};

const parseAsBoolean = (value: ?string, defaultValue: boolean = true): boolean =>
  value === 'false' ? false : value === 'true' ? true : defaultValue;

const parseAsString = (value: ?string): string => value || '';

const parseAsStringArray = (value: ?string): Array<string> => value ? value.split(',') : [];

export const parseQuery = (query: RawQuery): Query => ({
  assigned: parseAsBoolean(query.assigned),
  assignees: parseAsStringArray(query.assignees),
  authors: parseAsStringArray(query.authors),
  createdAfter: parseAsString(query.createdAfter),
  createdAt: parseAsString(query.createdAt),
  createdBefore: parseAsString(query.createdBefore),
  createdInLast: parseAsString(query.createdInLast),
  directories: parseAsStringArray(query.directories),
  files: parseAsStringArray(query.fileUuids),
  languages: parseAsStringArray(query.languages),
  modules: parseAsStringArray(query.moduleUuids),
  projects: parseAsStringArray(query.projectUuids),
  resolved: parseAsBoolean(query.resolved),
  resolutions: parseAsStringArray(query.resolutions),
  rules: parseAsStringArray(query.rules),
  severities: parseAsStringArray(query.severities),
  sinceLeakPeriod: parseAsBoolean(query.sinceLeakPeriod, false),
  statuses: parseAsStringArray(query.statuses),
  tags: parseAsStringArray(query.tags),
  types: parseAsStringArray(query.types)
});

export const getOpen = (query: RawQuery) => query.open;

export const areMyIssuesSelected = (query: RawQuery): boolean => query.myIssues === 'true';

const serializeString = (value: string): ?string => value || undefined;

const serializeValue = (value: Array<string>): ?string => value.length ? value.join() : undefined;

export const serializeQuery = (query: Query): RawQuery => {
  const filter = {
    assigned: query.assigned ? undefined : 'false',
    assignees: serializeValue(query.assignees),
    authors: serializeValue(query.authors),
    createdAfter: serializeString(query.createdAfter),
    createdAt: serializeString(query.createdAt),
    createdBefore: serializeString(query.createdBefore),
    createdInLast: serializeString(query.createdInLast),
    directories: serializeValue(query.directories),
    fileUuids: serializeValue(query.files),
    languages: serializeValue(query.languages),
    moduleUuids: serializeValue(query.modules),
    projectUuids: serializeValue(query.projects),
    resolved: query.resolved ? undefined : 'false',
    resolutions: serializeValue(query.resolutions),
    severities: serializeValue(query.severities),
    sinceLeakPeriod: query.sinceLeakPeriod ? 'true' : undefined,
    statuses: serializeValue(query.statuses),
    rules: serializeValue(query.rules),
    tags: serializeValue(query.tags),
    types: serializeValue(query.types)
  };
  return omitBy(filter, isNil);
};

const areArraysEqual = (a: Array<string>, b: Array<string>) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const areQueriesEqual = (a: RawQuery, b: RawQuery) => {
  const parsedA: Query = parseQuery(a);
  const parsedB: Query = parseQuery(b);

  const keysA = Object.keys(parsedA);
  const keysB = Object.keys(parsedB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    key =>
      Array.isArray(parsedA[key]) && Array.isArray(parsedB[key])
        ? areArraysEqual(parsedA[key], parsedB[key])
        : parsedA[key] === parsedB[key]
  );
};

type RawFacet = {
  property: string,
  values: Array<{ val: string, count: number }>
};

export type Facet = { [string]: number };

export const parseFacets = (facets: Array<RawFacet>): { [string]: Facet } => {
  // for readability purpose
  const propertyMapping = {
    fileUuids: 'files',
    moduleUuids: 'modules',
    projectUuids: 'projects'
  };

  const result = {};
  facets.forEach(facet => {
    const values = {};
    facet.values.forEach(value => {
      values[value.val] = value.count;
    });
    const finalProperty = propertyMapping[facet.property] || facet.property;
    result[finalProperty] = values;
  });
  return result;
};

export type ReferencedComponent = {
  key: string,
  name: string,
  organization: string,
  path: string
};

export type ReferencedUser = {
  avatar: string,
  name: string
};

export type ReferencedLanguage = {
  name: string
};

export type Component = {
  key: string,
  organization: string,
  qualifier: string
};
