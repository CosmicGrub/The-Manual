// On-device SQLite schema, mirroring prisma/schema.prisma's shape in app/
// (Profile/Progress/QuizAttempt/ReviewState/CheckpointSubmission) — same
// fields, same relationships, just plain SQL instead of Prisma, since this
// fork has no server to run Prisma's query engine in (not officially
// supported on Android). Module/Checkpoint aren't mirrored here: lesson and
// checkpoint metadata comes straight from the bundled content JSON
// (src/lib/content.ts), there's no need to duplicate it into a table just to
// join against — the exact same reasoning app/'s schema.prisma comment gives
// for keeping content out of the database entirely.
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS profile (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT 'blue',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  status TEXT NOT NULL,
  mastery_score REAL,
  updated_at TEXT NOT NULL,
  UNIQUE (profile_id, module_id),
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_progress_profile ON progress(profile_id);

CREATE TABLE IF NOT EXISTS quiz_attempt (
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  score REAL NOT NULL,
  answers TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempt_profile_module ON quiz_attempt(profile_id, module_id);

CREATE TABLE IF NOT EXISTS review_state (
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  due_at TEXT NOT NULL,
  UNIQUE (profile_id, item_id, item_type),
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_review_state_profile_due ON review_state(profile_id, due_at);

CREATE TABLE IF NOT EXISTS checkpoint_submission (
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  checkpoint_id TEXT NOT NULL,
  artifact_url TEXT NOT NULL,
  self_rubric TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_checkpoint_submission_profile ON checkpoint_submission(profile_id, checkpoint_id);
`
