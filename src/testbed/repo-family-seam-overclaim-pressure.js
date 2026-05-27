export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION =
  "testbed_repo_family_seam_overclaim_pressure.v0";

export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES = Object.freeze({
  VISIBLE_NOT_ADMITTED: "repo_family_seam_overclaim_pressure_visible_not_admitted",
  BLOCKED: "repo_family_seam_overclaim_pressure_blocked",
  UNSUPPORTED: "repo_family_seam_overclaim_pressure_unsupported",
  MALFORMED: "repo_family_seam_overclaim_pressure_malformed"
});

export const REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES = Object.freeze([
  "studio_specific_layer_api_attempted",
  "virtualia_specific_layer_api_attempted",
  "virtualia_lift_canon_quorum_rbc_overclaim",
  "edge_review_treated_as_layer_authority",
  "visibility_treated_as_authority_admission_continuity",
  "local_discovery_treated_as_mesh_discovery",
  "bytes_payload_visibility_treated_as_payload_validity",
  "packs_verification_treated_as_accepted_layer_state",
  "platform_receipt_treated_as_accepted_continuity",
  "repo_agent_reported_commit_test_treated_as_truth",
  "storage_index_view_treated_as_truth",
  "studio_dispatch_treated_as_result_acceptance_application",
  "virtualia_review_treated_as_queue_action_or_authority",
  "bytes_dispatch_treated_as_payload_fetch_or_result_acceptance",
  "packs_dispatch_treated_as_runtime_activation_or_result_acceptance",
  "platform_queued_action_treated_as_dispatch_or_host_consequence",
  "bytes_result_intake_treated_as_payload_validity_or_acceptance",
  "packs_result_intake_treated_as_accepted_layer_state_or_acceptance",
  "result_intake_reported_refs_treated_as_truth",
  "result_intake_visibility_treated_as_authority_admission_continuity",
  "result_intake_edge_review_treated_as_authority",
  "bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity",
  "packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state",
  "bytes_accepted_result_treated_as_payload_validity",
  "bytes_accepted_result_treated_as_payload_fetch_materialization",
  "bytes_accepted_result_treated_as_application_merge",
  "bytes_accepted_result_treated_as_layer_truth_continuity",
  "bytes_accepted_result_treated_as_storage_write_authority",
  "packs_accepted_result_treated_as_accepted_layer_state",
  "packs_accepted_result_treated_as_runtime_activation",
  "packs_accepted_result_treated_as_deployment_authority",
  "packs_accepted_result_treated_as_application_merge",
  "packs_accepted_result_treated_as_reported_truth",
  "packs_accepted_result_treated_as_platform_mutation",
  "packs_accepted_result_treated_as_storage_write_authority",
  "platform_dispatch_candidate_treated_as_dispatch_approval",
  "platform_dispatch_candidate_treated_as_host_local_activation",
  "platform_dispatch_candidate_treated_as_platform_mutation",
  "platform_dispatch_candidate_treated_as_layer_continuity_truth",
  "platform_dispatch_candidate_treated_as_storage_write_authority",
  "platform_dispatch_candidate_treated_as_deployment_ownership",
  "attention_queue_projection_treated_as_scheduler",
  "work_cell_candidate_treated_as_work_cell_creation",
  "work_cell_operator_decision_treated_as_scheduling_or_execution",
  "work_cell_creation_treated_as_execution",
  "dispatch_decision_request_treated_as_dispatch_approval",
  "dispatch_decision_request_observation_treated_as_platform_call",
  "review_only_work_cell_dispatch_candidate_treated_as_dispatch",
  "review_only_work_cell_dispatch_observation_treated_as_execution_or_success",
  "review_only_work_cell_result_intake_treated_as_acceptance_truth",
  "review_only_work_cell_result_intake_treated_as_payload_or_mutation",
  "review_only_work_cell_result_sidecar_treated_as_acceptance_or_decision",
  "review_only_work_cell_result_sidecar_treated_as_application_merge_mutation",
  "review_only_work_cell_result_sidecar_treated_as_payload_validity_materialization",
  "review_only_work_cell_result_acceptance_candidate_treated_as_decision_or_acceptance",
  "review_only_work_cell_result_acceptance_candidate_treated_as_application_merge_mutation",
  "review_only_work_cell_result_acceptance_candidate_treated_as_layer_storage_authority",
  "review_only_work_cell_result_acceptance_decision_treated_as_application_merge_mutation",
  "review_only_work_cell_result_acceptance_decision_treated_as_layer_storage_authority",
  "review_only_work_cell_result_acceptance_decision_treated_as_payload_validity",
  "review_only_work_cell_result_acceptance_decision_treated_as_dispatch_execution_platform",
  "review_only_work_cell_result_acceptance_decision_treated_as_event_family_auto_execute",
  "tui_visibility_treated_as_authority",
  "candidate_export_treated_as_work_cell_creation",
  "candidate_export_treated_as_dispatch_decision_request_creation",
  "copy_ready_text_treated_as_authority",
  "repo_agent_prompt_treated_as_repo_mutation_approval",
  "operator_decision_text_treated_as_decision_capture",
  "export_result_intake_candidate_treated_as_result_intake",
  "export_result_intake_candidate_treated_as_operator_decision_capture",
  "export_result_intake_candidate_treated_as_acceptance_truth",
  "export_result_intake_candidate_treated_as_execution_or_mutation",
  "export_result_intake_operator_decision_treated_as_acceptance_or_execution",
  "export_result_intake_observation_treated_as_acceptance_truth_mutation",
  "export_result_intake_board_projection_treated_as_authority_or_action",
  "platform_returned_operator_review_treated_as_dispatch_approval"
]);

const REQUIRED_CASES = Object.freeze([
  Object.freeze({
    caseId: "studio_specific_layer_api_attempted",
    sourceFamily: "studio",
    attemptedOverclaim: "Studio-specific Layer API treated as callable Layer authority",
    reasonCode: "blocked_case:studio_specific_layer_api_attempted"
  }),
  Object.freeze({
    caseId: "virtualia_specific_layer_api_attempted",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia-specific Layer API treated as callable Layer authority",
    reasonCode: "blocked_case:virtualia_specific_layer_api_attempted"
  }),
  Object.freeze({
    caseId: "virtualia_lift_canon_quorum_rbc_overclaim",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia lift, canon, quorum, or RBC evidence treated as Layer truth",
    reasonCode: "blocked_case:virtualia_lift_canon_quorum_rbc_overclaim"
  }),
  Object.freeze({
    caseId: "edge_review_treated_as_layer_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Edge review status treated as Layer authority",
    reasonCode: "blocked_case:edge_review_treated_as_layer_authority"
  }),
  Object.freeze({
    caseId: "visibility_treated_as_authority_admission_continuity",
    sourceFamily: "repo_family",
    attemptedOverclaim: "Visibility treated as authority, admission, or continuity",
    reasonCode: "blocked_case:visibility_treated_as_authority_admission_continuity"
  }),
  Object.freeze({
    caseId: "local_discovery_treated_as_mesh_discovery",
    sourceFamily: "testbed",
    attemptedOverclaim: "Local discovery treated as mesh discovery",
    reasonCode: "blocked_case:local_discovery_treated_as_mesh_discovery"
  }),
  Object.freeze({
    caseId: "bytes_payload_visibility_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes payload visibility treated as payload validity",
    reasonCode: "blocked_case:bytes_payload_visibility_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "packs_verification_treated_as_accepted_layer_state",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs verification treated as accepted Layer state",
    reasonCode: "blocked_case:packs_verification_treated_as_accepted_layer_state"
  }),
  Object.freeze({
    caseId: "platform_receipt_treated_as_accepted_continuity",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform receipt treated as accepted continuity",
    reasonCode: "blocked_case:platform_receipt_treated_as_accepted_continuity"
  }),
  Object.freeze({
    caseId: "repo_agent_reported_commit_test_treated_as_truth",
    sourceFamily: "repo_agent",
    attemptedOverclaim: "Repo-agent reported commit or test result treated as truth",
    reasonCode: "blocked_case:repo_agent_reported_commit_test_treated_as_truth"
  }),
  Object.freeze({
    caseId: "storage_index_view_treated_as_truth",
    sourceFamily: "testbed",
    attemptedOverclaim: "Storage, index, or view treated as truth",
    reasonCode: "blocked_case:storage_index_view_treated_as_truth"
  }),
  Object.freeze({
    caseId: "studio_dispatch_treated_as_result_acceptance_application",
    sourceFamily: "studio",
    attemptedOverclaim: "Studio dispatch observation treated as result acceptance, application, merge, or work success",
    reasonCode: "blocked_case:studio_dispatch_treated_as_result_acceptance_application"
  }),
  Object.freeze({
    caseId: "virtualia_review_treated_as_queue_action_or_authority",
    sourceFamily: "virtualia",
    attemptedOverclaim: "Virtualia pressure review treated as queue action, authority, or repo-agent dispatch approval",
    reasonCode: "blocked_case:virtualia_review_treated_as_queue_action_or_authority"
  }),
  Object.freeze({
    caseId: "bytes_dispatch_treated_as_payload_fetch_or_result_acceptance",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes pressure dispatch observation treated as payload fetch, materialization, or result acceptance",
    reasonCode: "blocked_case:bytes_dispatch_treated_as_payload_fetch_or_result_acceptance"
  }),
  Object.freeze({
    caseId: "packs_dispatch_treated_as_runtime_activation_or_result_acceptance",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs pressure dispatch observation treated as runtime activation, deployment authority, or result acceptance",
    reasonCode: "blocked_case:packs_dispatch_treated_as_runtime_activation_or_result_acceptance"
  }),
  Object.freeze({
    caseId: "platform_queued_action_treated_as_dispatch_or_host_consequence",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform pressure queued action treated as dispatch approval, host-local consequence, or deployment ownership",
    reasonCode: "blocked_case:platform_queued_action_treated_as_dispatch_or_host_consequence"
  }),
  Object.freeze({
    caseId: "bytes_result_intake_treated_as_payload_validity_or_acceptance",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes pressure result intake treated as payload validity, payload materialization, or result acceptance",
    reasonCode: "blocked_case:bytes_result_intake_treated_as_payload_validity_or_acceptance"
  }),
  Object.freeze({
    caseId: "packs_result_intake_treated_as_accepted_layer_state_or_acceptance",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs pressure result intake treated as accepted Layer state, runtime activation, deployment authority, or result acceptance",
    reasonCode: "blocked_case:packs_result_intake_treated_as_accepted_layer_state_or_acceptance"
  }),
  Object.freeze({
    caseId: "result_intake_reported_refs_treated_as_truth",
    sourceFamily: "repo_agent",
    attemptedOverclaim: "Repo-agent reported commit, test, or status refs from result intake treated as truth",
    reasonCode: "blocked_case:result_intake_reported_refs_treated_as_truth"
  }),
  Object.freeze({
    caseId: "result_intake_visibility_treated_as_authority_admission_continuity",
    sourceFamily: "repo_family",
    attemptedOverclaim: "Result-intake visibility treated as authority, admission, or continuity",
    reasonCode: "blocked_case:result_intake_visibility_treated_as_authority_admission_continuity"
  }),
  Object.freeze({
    caseId: "result_intake_edge_review_treated_as_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Edge result-intake review treated as authority",
    reasonCode: "blocked_case:result_intake_edge_review_treated_as_authority"
  }),
  Object.freeze({
    caseId: "bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes result-acceptance candidate treated as acceptance, payload validity, payload fetch, or materialization",
    reasonCode: "blocked_case:bytes_result_acceptance_candidate_treated_as_acceptance_or_payload_validity"
  }),
  Object.freeze({
    caseId: "packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs result-acceptance candidate treated as acceptance, accepted Layer state, runtime activation, or deployment authority",
    reasonCode: "blocked_case:packs_result_acceptance_candidate_treated_as_acceptance_or_accepted_layer_state"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as payload validity",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_payload_fetch_materialization",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as payload fetch or materialization",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_payload_fetch_materialization"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_application_merge",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as result application or merge",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_application_merge"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_layer_truth_continuity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as Layer truth or continuity",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_layer_truth_continuity"
  }),
  Object.freeze({
    caseId: "bytes_accepted_result_treated_as_storage_write_authority",
    sourceFamily: "bytes",
    attemptedOverclaim: "Bytes accepted result evidence treated as storage write or authority",
    reasonCode: "blocked_case:bytes_accepted_result_treated_as_storage_write_authority"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_accepted_layer_state",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as accepted Layer state",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_accepted_layer_state"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_runtime_activation",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as runtime activation",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_runtime_activation"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_deployment_authority",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as deployment authority",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_deployment_authority"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_application_merge",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as result application or merge",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_application_merge"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_reported_truth",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as reported commit, test, or status truth",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_reported_truth"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_platform_mutation",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as Platform mutation",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_platform_mutation"
  }),
  Object.freeze({
    caseId: "packs_accepted_result_treated_as_storage_write_authority",
    sourceFamily: "packs",
    attemptedOverclaim: "Packs accepted result evidence treated as storage write or authority",
    reasonCode: "blocked_case:packs_accepted_result_treated_as_storage_write_authority"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_dispatch_approval",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as dispatch approval",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_dispatch_approval"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_host_local_activation",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as host-local activation",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_host_local_activation"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_platform_mutation",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as Platform mutation",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_platform_mutation"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_layer_continuity_truth",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as Layer continuity or truth",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_layer_continuity_truth"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_storage_write_authority",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as storage write or authority",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_storage_write_authority"
  }),
  Object.freeze({
    caseId: "platform_dispatch_candidate_treated_as_deployment_ownership",
    sourceFamily: "platform",
    attemptedOverclaim: "Platform dispatch candidate treated as deployment ownership",
    reasonCode: "blocked_case:platform_dispatch_candidate_treated_as_deployment_ownership"
  }),
  Object.freeze({
    caseId: "attention_queue_projection_treated_as_scheduler",
    sourceFamily: "edge",
    attemptedOverclaim: "Safe-continuation attention queue projection treated as scheduler, runner, dispatch queue, or execution queue",
    reasonCode: "blocked_case:attention_queue_projection_treated_as_scheduler"
  }),
  Object.freeze({
    caseId: "work_cell_candidate_treated_as_work_cell_creation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell candidate treated as created work cell, scheduled work, or repo-agent assignment",
    reasonCode: "blocked_case:work_cell_candidate_treated_as_work_cell_creation"
  }),
  Object.freeze({
    caseId: "work_cell_operator_decision_treated_as_scheduling_or_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell operator decision treated as scheduling, dispatch, execution, repo mutation, or authority",
    reasonCode: "blocked_case:work_cell_operator_decision_treated_as_scheduling_or_execution"
  }),
  Object.freeze({
    caseId: "work_cell_creation_treated_as_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell creation treated as execution, repo mutation, or result acceptance",
    reasonCode: "blocked_case:work_cell_creation_treated_as_execution"
  }),
  Object.freeze({
    caseId: "dispatch_decision_request_treated_as_dispatch_approval",
    sourceFamily: "edge",
    attemptedOverclaim: "Dispatch-decision request candidate treated as dispatch approval, Platform call, or host-local consequence",
    reasonCode: "blocked_case:dispatch_decision_request_treated_as_dispatch_approval"
  }),
  Object.freeze({
    caseId: "dispatch_decision_request_observation_treated_as_platform_call",
    sourceFamily: "edge",
    attemptedOverclaim: "Dispatch-decision request observation treated as dispatch approval, Platform call, host-local consequence, activation, or deployment authority",
    reasonCode: "blocked_case:dispatch_decision_request_observation_treated_as_platform_call"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_dispatch_candidate_treated_as_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell dispatch candidate treated as dispatch, agent launch, execution, or repo mutation",
    reasonCode: "blocked_case:review_only_work_cell_dispatch_candidate_treated_as_dispatch"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_dispatch_observation_treated_as_execution_or_success",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell dispatch observation treated as execution proof, work success, result intake, result acceptance, or repo mutation",
    reasonCode: "blocked_case:review_only_work_cell_dispatch_observation_treated_as_execution_or_success"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_intake_treated_as_acceptance_truth",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result intake treated as result acceptance, application, merge, or reported truth",
    reasonCode: "blocked_case:review_only_work_cell_result_intake_treated_as_acceptance_truth"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_intake_treated_as_payload_or_mutation",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell result intake treated as Bytes payload fetch, payload materialization, payload validity, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:review_only_work_cell_result_intake_treated_as_payload_or_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_sidecar_treated_as_acceptance_or_decision",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result sidecar review treated as result acceptance or operator decision capture",
    reasonCode: "blocked_case:review_only_work_cell_result_sidecar_treated_as_acceptance_or_decision"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_sidecar_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result sidecar review treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:review_only_work_cell_result_sidecar_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_sidecar_treated_as_payload_validity_materialization",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell result sidecar review treated as payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:review_only_work_cell_result_sidecar_treated_as_payload_validity_materialization"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_candidate_treated_as_decision_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance candidate treated as operator decision, accepted result, or result acceptance observation",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_candidate_treated_as_decision_or_acceptance"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_candidate_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance candidate treated as result application, merge, repo mutation, Layer mutation, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_candidate_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_candidate_treated_as_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance candidate treated as Layer continuity, Layer truth, storage write, authority, payload validity, or payload materialization",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_candidate_treated_as_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_decision_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance operator decision treated as result application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_decision_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_decision_treated_as_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance operator decision treated as Layer truth, Layer continuity, storage write, or authority transition",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_decision_treated_as_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_decision_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell result acceptance operator decision treated as payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_decision_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_decision_treated_as_dispatch_execution_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance operator decision treated as dispatch, execution, Platform call, host-local consequence, or activation",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_decision_treated_as_dispatch_execution_platform"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_decision_treated_as_event_family_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance operator decision treated as event-family expansion or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_decision_treated_as_event_family_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_visibility_treated_as_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI visibility treated as operator decision, approval, authority, or execution readiness",
    reasonCode: "blocked_case:tui_visibility_treated_as_authority"
  }),
  Object.freeze({
    caseId: "candidate_export_treated_as_work_cell_creation",
    sourceFamily: "edge",
    attemptedOverclaim: "Candidate export view treated as review-only work-cell creation",
    reasonCode: "blocked_case:candidate_export_treated_as_work_cell_creation"
  }),
  Object.freeze({
    caseId: "candidate_export_treated_as_dispatch_decision_request_creation",
    sourceFamily: "edge",
    attemptedOverclaim: "Candidate export view treated as dispatch-decision-request creation",
    reasonCode: "blocked_case:candidate_export_treated_as_dispatch_decision_request_creation"
  }),
  Object.freeze({
    caseId: "copy_ready_text_treated_as_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Copy-ready handoff text treated as authority, approval, or readiness conversion",
    reasonCode: "blocked_case:copy_ready_text_treated_as_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_prompt_treated_as_repo_mutation_approval",
    sourceFamily: "repo_agent",
    attemptedOverclaim: "Repo-agent prompt candidate treated as repo mutation approval",
    reasonCode: "blocked_case:repo_agent_prompt_treated_as_repo_mutation_approval"
  }),
  Object.freeze({
    caseId: "operator_decision_text_treated_as_decision_capture",
    sourceFamily: "edge",
    attemptedOverclaim: "Operator decision request text candidate treated as captured operator decision",
    reasonCode: "blocked_case:operator_decision_text_treated_as_decision_capture"
  }),
  Object.freeze({
    caseId: "export_result_intake_candidate_treated_as_result_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake candidate treated as performed result intake",
    reasonCode: "blocked_case:export_result_intake_candidate_treated_as_result_intake"
  }),
  Object.freeze({
    caseId: "export_result_intake_candidate_treated_as_operator_decision_capture",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake candidate treated as operator decision capture or approval",
    reasonCode: "blocked_case:export_result_intake_candidate_treated_as_operator_decision_capture"
  }),
  Object.freeze({
    caseId: "export_result_intake_candidate_treated_as_acceptance_truth",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake candidate treated as result acceptance or reported truth",
    reasonCode: "blocked_case:export_result_intake_candidate_treated_as_acceptance_truth"
  }),
  Object.freeze({
    caseId: "export_result_intake_candidate_treated_as_execution_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake candidate treated as execution, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:export_result_intake_candidate_treated_as_execution_or_mutation"
  }),
  Object.freeze({
    caseId: "export_result_intake_operator_decision_treated_as_acceptance_or_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake operator decision treated as result acceptance, dispatch, execution, or mutation approval",
    reasonCode: "blocked_case:export_result_intake_operator_decision_treated_as_acceptance_or_execution"
  }),
  Object.freeze({
    caseId: "export_result_intake_observation_treated_as_acceptance_truth_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake observation treated as result acceptance, reported truth, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:export_result_intake_observation_treated_as_acceptance_truth_mutation"
  }),
  Object.freeze({
    caseId: "export_result_intake_board_projection_treated_as_authority_or_action",
    sourceFamily: "edge",
    attemptedOverclaim: "Export result intake board projection treated as authority, decision capture, scheduling, dispatch, execution, or mutation",
    reasonCode: "blocked_case:export_result_intake_board_projection_treated_as_authority_or_action"
  }),
  Object.freeze({
    caseId: "platform_returned_operator_review_treated_as_dispatch_approval",
    sourceFamily: "platform",
    attemptedOverclaim: "Returned Platform operator-review response treated as dispatch approval, Platform call, host-local consequence, or activation",
    reasonCode: "blocked_case:platform_returned_operator_review_treated_as_dispatch_approval"
  })
]);

const BOUNDARY_FALSE_FLAGS = Object.freeze([
  "callsLayer",
  "callsEdge",
  "callsStudio",
  "callsVirtualia",
  "callsBytes",
  "callsPacks",
  "callsPlatform",
  "dispatchesRepoAgents",
  "autoExecutes",
  "executesBehavior",
  "mutatesLayer",
  "mutatesSourceRepo",
  "writesProductionStorage",
  "createsAuthority",
  "acceptsAdmission",
  "acceptsContinuity",
  "acceptsLayerState",
  "claimsSourceSemantics",
  "claimsPayloadValidity",
  "claimsMeshDiscovery",
  "claimsTruth"
]);

const CASE_STOP_STATUSES = Object.freeze({
  BLOCKED: "blocked",
  UNSUPPORTED: "unsupported",
  VISIBLE_NOT_ADMITTED: "visible_not_admitted"
});

const TARGET_OWNER_REPO = "mesh-ecology-testbed";
const TARGET_LANE_ID = "lane-d";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function stringArray(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === "string" && entry.trim() !== "").map((entry) => entry.trim())
    : [];
}

function caseBoundary(pressureCase) {
  return isPlainObject(pressureCase?.boundary) ? pressureCase.boundary : {};
}

function staticPressureCase(requiredCase) {
  return Object.freeze({
    ...requiredCase,
    stopStatus: CASE_STOP_STATUSES.BLOCKED,
    evidencePosture: "evidence_only",
    admitted: false,
    boundary: Object.freeze(Object.fromEntries(BOUNDARY_FALSE_FLAGS.map((flag) => [flag, false])))
  });
}

export const TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET = Object.freeze({
  artifactKind: "testbed_repo_family_seam_overclaim_pressure_packet",
  schemaVersion: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION,
  packetId: "testbed:lane-d:repo-family-seam-overclaim-pressure:v0",
  laneId: TARGET_LANE_ID,
  ownerRepo: TARGET_OWNER_REPO,
  pressureKind: "fail_closed_repo_family_seam_pressure",
  evidencePosture: "evidence_only",
  reportOnly: true,
  createsAuthority: false,
  dispatchesRepoAgents: false,
  autoExecutes: false,
  writesProductionStorage: false,
  claimsSourceSemantics: false,
  cases: Object.freeze(REQUIRED_CASES.map(staticPressureCase))
});

function pressureCases(packet) {
  return Array.isArray(packet?.cases) ? packet.cases.filter(isPlainObject) : [];
}

function validateCase(pressureCase, expected) {
  const reasonCodes = [];
  const boundary = caseBoundary(pressureCase);

  if (!isPlainObject(pressureCase)) {
    return Object.freeze([`failed_pressure_case:${expected.caseId}`]);
  }

  if (pressureCase.caseId !== expected.caseId) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.reasonCode !== expected.reasonCode) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.stopStatus !== CASE_STOP_STATUSES.BLOCKED || pressureCase.admitted !== false) {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (pressureCase.evidencePosture !== "evidence_only") {
    reasonCodes.push(`failed_pressure_case:${expected.caseId}`);
  }
  if (BOUNDARY_FALSE_FLAGS.some((flag) => boundary[flag] !== false)) {
    reasonCodes.push(`boundary_overclaim:${expected.caseId}`);
  }

  return Object.freeze(reasonCodes);
}

function validatePacket(packet) {
  const reasonCodes = [];

  if (!isPlainObject(packet)) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.MALFORMED,
      reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_packet_missing_or_malformed"])
    });
  }

  if (packet.ownerRepo !== TARGET_OWNER_REPO || packet.laneId !== TARGET_LANE_ID) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.UNSUPPORTED,
      reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_unsupported_target"])
    });
  }

  if (packet.artifactKind !== "testbed_repo_family_seam_overclaim_pressure_packet") {
    reasonCodes.push("repo_family_seam_overclaim_pressure_artifact_kind_mismatch");
  }
  if (packet.schemaVersion !== TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION) {
    reasonCodes.push("repo_family_seam_overclaim_pressure_schema_mismatch");
  }
  if (
    packet.evidencePosture !== "evidence_only" ||
    packet.reportOnly !== true ||
    packet.createsAuthority !== false ||
    packet.dispatchesRepoAgents !== false ||
    packet.autoExecutes !== false ||
    packet.writesProductionStorage !== false ||
    packet.claimsSourceSemantics !== false
  ) {
    reasonCodes.push("repo_family_seam_overclaim_pressure_packet_boundary_overclaim");
  }

  const cases = pressureCases(packet);
  const casesById = new Map(cases.map((pressureCase) => [pressureCase.caseId, pressureCase]));

  for (const caseId of REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES) {
    if (!casesById.has(caseId)) {
      reasonCodes.push(`missing_pressure_case:${caseId}`);
    }
  }

  for (const expected of REQUIRED_CASES) {
    const pressureCase = casesById.get(expected.caseId);
    reasonCodes.push(...validateCase(pressureCase, expected));
  }

  if (reasonCodes.length > 0) {
    return Object.freeze({
      reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.BLOCKED,
      reasonCodes: Object.freeze(reasonCodes)
    });
  }

  return Object.freeze({
    reviewStatus: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES.VISIBLE_NOT_ADMITTED,
    reasonCodes: Object.freeze(["repo_family_seam_overclaim_pressure_visible_not_admitted"])
  });
}

export function buildTestbedRepoFamilySeamOverclaimPressureReport({
  pressurePacket = TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_PACKET,
  createdAt = new Date().toISOString(),
  reportId = null
} = {}) {
  const validation = validatePacket(pressurePacket);
  const cases = pressureCases(pressurePacket);
  const blockedCases = cases.filter((pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.BLOCKED);
  const unsupportedCases = cases.filter((pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.UNSUPPORTED);
  const visibleNotAdmittedCases = cases.filter(
    (pressureCase) => pressureCase.stopStatus === CASE_STOP_STATUSES.VISIBLE_NOT_ADMITTED
  );

  return Object.freeze({
    artifactKind: "testbed_repo_family_seam_overclaim_pressure_report",
    schemaVersion: TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_SCHEMA_VERSION,
    reportId: nonEmptyString(
      reportId,
      `testbed-repo-family-seam-overclaim-pressure:${nonEmptyString(pressurePacket?.packetId, "unknown")}:${createdAt}`
    ),
    createdAt,
    laneId: nonEmptyString(pressurePacket?.laneId),
    ownerRepo: nonEmptyString(pressurePacket?.ownerRepo),
    sourcePacketId: nonEmptyString(pressurePacket?.packetId),
    reviewStatus: validation.reviewStatus,
    reasonCodes: validation.reasonCodes,
    requiredCaseIds: Object.freeze([...REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES]),
    observedCaseIds: Object.freeze(stringArray(cases.map((pressureCase) => pressureCase.caseId))),
    blockedCaseIds: Object.freeze(stringArray(blockedCases.map((pressureCase) => pressureCase.caseId))),
    unsupportedCaseIds: Object.freeze(stringArray(unsupportedCases.map((pressureCase) => pressureCase.caseId))),
    visibleNotAdmittedCaseIds: Object.freeze(stringArray(visibleNotAdmittedCases.map((pressureCase) => pressureCase.caseId))),
    admittedCaseCount: cases.filter((pressureCase) => pressureCase.admitted === true).length,
    reviewOnly: true,
    evidenceOnly: true,
    visibleNotAdmitted: true,
    testbedMutatedLayer: false,
    testbedMutatedSourceRepo: false,
    testbedCalledLayer: false,
    testbedCalledEdge: false,
    testbedCalledStudio: false,
    testbedCalledVirtualia: false,
    testbedCalledBytes: false,
    testbedCalledPacks: false,
    testbedCalledPlatform: false,
    testbedExecutedPlatformBehavior: false,
    testbedExecutedPacksBehavior: false,
    testbedExecutedBytesBehavior: false,
    testbedDispatchedRepoAgents: false,
    testbedAutoExecuted: false,
    testbedWroteProductionStorage: false,
    authorityCreated: false,
    layerAuthorityCreated: false,
    layerStateAccepted: false,
    continuityAccepted: false,
    meshDiscoveryClaimed: false,
    payloadValidityClaimed: false,
    sourceSemanticsClaimed: false,
    storageIndexViewIsTruth: false,
    repoAgentReportIsTruth: false
  });
}

export function listTestbedRepoFamilySeamOverclaimPressureCases() {
  return Object.freeze([...REQUIRED_REPO_FAMILY_SEAM_OVERCLAIM_CASES]);
}

export function listTestbedRepoFamilySeamOverclaimPressureStatuses() {
  return Object.freeze(Object.values(TESTBED_REPO_FAMILY_SEAM_OVERCLAIM_PRESSURE_STATUSES));
}
