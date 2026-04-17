# Repo Guidance

This repo is intentionally modest.

Primary rules:

- keep the repo framed as a local participation testbed
- keep outputs framed as local observations, not truth
- do not turn scenario timing into a hidden scheduler abstraction
- do not add discovery, replication, or production runtime claims casually
- keep bytes and transport concerns optional and adjacent

When adding scenarios or actors:

- prefer explicit local fixtures over generic engine layers
- document what a scenario demonstrates and what it does not prove
- keep tutorial behavior deterministic enough for tests

