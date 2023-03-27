import type { CollectionEntry } from 'astro:content';
import type { Track } from './tracks';

export type CourseEntries =
  | CollectionEntry<Track.Ink>[]
  | CollectionEntry<Track.Rust>[]
  | CollectionEntry<Track.Substrate>[];

export type CourseEntriesByModule = CourseEntries[];
