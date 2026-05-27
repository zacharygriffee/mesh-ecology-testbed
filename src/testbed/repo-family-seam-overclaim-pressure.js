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
  "review_only_work_cell_result_acceptance_observation_treated_as_application_merge_mutation",
  "review_only_work_cell_result_acceptance_observation_treated_as_payload_validity",
  "review_only_work_cell_result_acceptance_observation_treated_as_layer_storage_authority",
  "review_only_work_cell_result_acceptance_observation_treated_as_dispatch_execution_auto_execute",
  "review_only_work_cell_loop_summary_treated_as_application_merge_mutation",
  "review_only_work_cell_loop_summary_treated_as_payload_validity",
  "review_only_work_cell_loop_summary_treated_as_authority_or_next_approval",
  "review_only_work_cell_loop_summary_tui_treated_as_action_surface",
  "review_only_work_cell_loop_field_trial_treated_as_general_enclosure_or_authority",
  "review_only_work_cell_loop_field_trial_treated_as_application_merge_mutation",
  "review_only_work_cell_loop_field_trial_treated_as_payload_or_storage",
  "review_only_work_cell_loop_field_trial_tui_treated_as_action_surface",
  "review_only_work_cell_loop_repetition_batch_treated_as_wall_clock_or_general_enclosure",
  "review_only_work_cell_loop_repetition_batch_treated_as_scheduling_dispatch_execution",
  "review_only_work_cell_loop_repetition_batch_treated_as_application_merge_mutation",
  "review_only_work_cell_loop_repetition_batch_treated_as_payload_storage_authority",
  "review_only_work_cell_loop_repetition_batch_tui_treated_as_action_surface",
  "repo_agent_seat_descriptor_treated_as_identity_or_admission",
  "repo_agent_seat_readiness_treated_as_scheduling_dispatch_execution",
  "repo_agent_seat_readiness_treated_as_result_truth_or_acceptance",
  "repo_agent_seat_readiness_treated_as_repo_layer_storage_authority",
  "repo_agent_seat_tui_card_treated_as_action_surface",
  "repo_agent_operational_board_treated_as_scheduling_dispatch_execution",
  "repo_agent_operational_board_treated_as_decision_capture_or_approval",
  "repo_agent_operational_board_treated_as_result_acceptance_truth_application",
  "repo_agent_operational_board_treated_as_repo_layer_storage_authority",
  "repo_agent_operational_board_tui_treated_as_action_surface",
  "repo_agent_operational_board_field_use_report_treated_as_scheduling_dispatch_execution",
  "repo_agent_operational_board_field_use_report_treated_as_decision_or_authority",
  "repo_agent_operational_board_field_use_report_treated_as_result_truth_or_mutation",
  "repo_agent_operational_board_field_use_report_treated_as_general_enclosure_or_auto_execute",
  "repo_agent_operational_board_hardened_field_measurement_treated_as_scheduling_dispatch_execution",
  "repo_agent_operational_board_hardened_field_measurement_treated_as_decision_or_authority",
  "repo_agent_operational_board_hardened_field_measurement_treated_as_result_truth_mutation_or_auto_execute",
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
  "platform_returned_operator_review_treated_as_dispatch_approval",
  "repo_agent_operational_board_prompt_candidate_treated_as_prompt_delivery_or_dispatch",
  "repo_agent_operational_board_prompt_candidate_treated_as_decision_or_authority",
  "repo_agent_operational_board_prompt_candidate_treated_as_result_truth_mutation_or_auto_execute",
  "repo_agent_seat_exchange_convention_treated_as_transport_scheduler_or_authority",
  "repo_agent_seat_inbox_packet_candidate_treated_as_delivery_invocation_or_work_cell",
  "repo_agent_seat_outbox_report_candidate_treated_as_import_acceptance_truth_or_mutation",
  "repo_agent_seat_inbox_handoff_decision_treated_as_handoff_attempt",
  "repo_agent_seat_inbox_handoff_decision_treated_as_delivery_dispatch_execution",
  "repo_agent_seat_inbox_handoff_decision_treated_as_result_import_acceptance_truth",
  "repo_agent_seat_inbox_handoff_decision_treated_as_repo_layer_storage_authority",
  "repo_agent_seat_inbox_handoff_observation_treated_as_implicit_path_or_repo_discovery",
  "repo_agent_seat_inbox_handoff_observation_treated_as_shell_network_or_agent_invocation",
  "repo_agent_seat_inbox_handoff_observation_treated_as_dispatch_execution_or_work_cell",
  "repo_agent_seat_inbox_handoff_observation_treated_as_result_import_acceptance_truth",
  "repo_agent_seat_inbox_handoff_observation_treated_as_repo_layer_storage_authority",
  "repo_agent_seat_outbox_import_decision_treated_as_import_or_result_intake",
  "repo_agent_seat_outbox_import_decision_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_outbox_import_decision_treated_as_application_merge_or_mutation",
  "repo_agent_seat_outbox_import_decision_treated_as_dispatch_execution_or_platform",
  "repo_agent_seat_outbox_import_decision_treated_as_authority_event_or_auto_execute",
  "repo_agent_seat_inbox_handoff_receipt_treated_as_delivery_read_or_execution_proof",
  "repo_agent_seat_outbox_import_observation_treated_as_implicit_path_or_repo_discovery",
  "repo_agent_seat_outbox_import_observation_treated_as_shell_network_or_agent_invocation",
  "repo_agent_seat_outbox_import_observation_treated_as_result_intake_acceptance_truth",
  "repo_agent_seat_outbox_import_observation_treated_as_payload_validity_or_materialization",
  "repo_agent_seat_outbox_import_observation_treated_as_application_merge_or_mutation",
  "repo_agent_seat_outbox_import_observation_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_outbox_result_intake_candidate_treated_as_result_intake_or_decision",
  "repo_agent_seat_outbox_result_intake_candidate_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_outbox_result_intake_candidate_treated_as_application_merge_or_mutation",
  "repo_agent_seat_outbox_result_intake_candidate_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_outbox_result_intake_decision_treated_as_intake_or_observation",
  "repo_agent_seat_outbox_result_intake_decision_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_outbox_result_intake_decision_treated_as_application_merge_or_mutation",
  "repo_agent_seat_outbox_result_intake_decision_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_outbox_result_intake_observation_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_outbox_result_intake_observation_treated_as_application_merge_or_mutation",
  "repo_agent_seat_outbox_result_intake_observation_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_exchange_loop_summary_treated_as_delivery_read_or_execution_proof",
  "repo_agent_seat_exchange_loop_summary_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_exchange_loop_summary_treated_as_application_merge_or_mutation",
  "repo_agent_seat_exchange_loop_summary_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_exchange_loop_board_tui_burden_treated_as_action_authority",
  "repo_agent_seat_exchange_loop_burden_measurement_treated_as_handoff_import_or_intake",
  "repo_agent_seat_exchange_loop_burden_measurement_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_exchange_loop_burden_measurement_treated_as_application_merge_or_mutation",
  "repo_agent_seat_exchange_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_exchange_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
  "repo_agent_seat_exchange_loop_burden_measurement_tui_treated_as_action_authority",
  "repo_agent_seat_exchange_mediation_bundle_treated_as_scheduler_runner_or_workflow",
  "repo_agent_seat_exchange_mediation_bundle_treated_as_decision_or_handoff",
  "repo_agent_seat_exchange_mediation_bundle_treated_as_import_intake_or_acceptance",
  "repo_agent_seat_exchange_mediation_bundle_treated_as_payload_or_mutation",
  "repo_agent_seat_exchange_mediation_bundle_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_exchange_mediation_bundle_points_treated_as_approval_or_proof",
  "repo_agent_seat_exchange_mediation_bundle_tui_treated_as_action_authority",
  "repo_agent_seat_exchange_mediation_decision_projection_treated_as_operator_decision",
  "repo_agent_seat_exchange_mediation_decision_projection_treated_as_handoff_import_or_intake",
  "repo_agent_seat_exchange_mediation_decision_projection_treated_as_acceptance_truth_or_payload",
  "repo_agent_seat_exchange_mediation_decision_projection_treated_as_application_merge_or_mutation",
  "repo_agent_seat_exchange_mediation_decision_projection_treated_as_dispatch_platform_authority_or_auto_execute",
  "repo_agent_seat_exchange_mediation_decision_projection_tui_treated_as_action_authority",
  "tui_inbox_handoff_decision_capture_treated_as_handoff_attempt",
  "tui_inbox_handoff_decision_capture_treated_as_delivery_or_execution",
  "tui_inbox_handoff_decision_capture_treated_as_import_intake_or_acceptance",
  "tui_inbox_handoff_decision_capture_treated_as_payload_application_or_mutation",
  "tui_inbox_handoff_decision_capture_treated_as_authority_event_or_auto_execute",
  "tui_inbox_handoff_decision_capture_visibility_treated_as_action_authority",
  "tui_outbox_import_decision_capture_treated_as_outbox_import",
  "tui_outbox_import_decision_capture_treated_as_result_intake_or_acceptance",
  "tui_outbox_import_decision_capture_treated_as_payload_application_or_mutation",
  "tui_outbox_import_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute",
  "tui_outbox_import_decision_capture_receipt_treated_as_delivery_read_or_execution_proof",
  "tui_outbox_import_decision_capture_visibility_treated_as_action_authority",
  "tui_outbox_result_intake_decision_capture_treated_as_result_intake",
  "tui_outbox_result_intake_decision_capture_treated_as_acceptance_truth_or_payload",
  "tui_outbox_result_intake_decision_capture_treated_as_application_merge_or_mutation",
  "tui_outbox_result_intake_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute",
  "tui_outbox_result_intake_decision_capture_visibility_treated_as_action_authority",
  "tui_mediated_seat_loop_burden_measurement_treated_as_handoff_import_or_intake",
  "tui_mediated_seat_loop_burden_measurement_treated_as_acceptance_truth_or_payload",
  "tui_mediated_seat_loop_burden_measurement_treated_as_application_merge_or_mutation",
  "tui_mediated_seat_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute",
  "tui_mediated_seat_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
  "tui_mediated_seat_loop_burden_measurement_decision_capture_treated_as_action_execution",
  "tui_mediated_seat_loop_burden_measurement_tui_treated_as_action_authority",
  "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_decision_or_action",
  "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_acceptance_mutation_or_authority",
  "tui_mediated_seat_loop_remaining_burden_analysis_recommendation_treated_as_approval",
  "tui_receipt_visibility_hardening_treated_as_handoff_import_or_intake",
  "tui_receipt_visibility_hardening_treated_as_acceptance_truth_or_payload",
  "tui_receipt_visibility_hardening_treated_as_action_authority_or_proof",
  "tui_receipt_visibility_next_posture_panel_treated_as_decision_or_action",
  "tui_receipt_visibility_next_posture_panel_treated_as_acceptance_truth_or_mutation",
  "tui_receipt_visibility_next_posture_panel_treated_as_approval_authority_or_proof",
  "tui_receipt_action_candidate_projection_treated_as_action_or_receipt",
  "tui_receipt_action_candidate_projection_treated_as_acceptance_truth_or_mutation",
  "tui_receipt_action_candidate_projection_treated_as_approval_authority_or_auto_execute",
  "tui_triggered_receipt_action_treated_as_scheduler_dispatch_or_agent_execution",
  "tui_triggered_receipt_action_treated_as_acceptance_truth_or_payload",
  "tui_triggered_receipt_action_treated_as_application_merge_mutation_or_authority",
  "tui_triggered_receipt_action_burden_measurement_treated_as_action_or_receipt",
  "tui_triggered_receipt_action_burden_measurement_treated_as_acceptance_truth_or_payload",
  "tui_triggered_receipt_action_burden_measurement_treated_as_application_merge_mutation_or_authority",
  "tui_triggered_receipt_action_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
  "tui_triggered_receipt_action_burden_measurement_tui_treated_as_action_authority",
  "tui_mediated_receipt_action_loop_summary_treated_as_action_or_receipt",
  "tui_mediated_receipt_action_loop_summary_treated_as_acceptance_truth_or_payload",
  "tui_mediated_receipt_action_loop_summary_treated_as_application_merge_mutation_or_authority",
  "tui_mediated_receipt_action_loop_summary_treated_as_delivery_read_execution_or_enclosure_proof",
  "tui_mediated_receipt_action_loop_summary_tui_treated_as_action_authority",
  "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_action_or_receipt",
  "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_acceptance_truth_or_payload",
  "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_application_merge_mutation_or_authority",
  "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
  "tui_mediated_receipt_action_loop_summary_burden_measurement_tui_treated_as_action_authority",
  "tui_mediated_local_seat_loop_operational_readiness_treated_as_enclosure_or_autonomy_proof",
  "tui_mediated_local_seat_loop_operational_readiness_treated_as_dispatch_execution_or_delivery_proof",
  "tui_mediated_local_seat_loop_operational_readiness_treated_as_acceptance_truth_or_payload",
  "tui_mediated_local_seat_loop_operational_readiness_treated_as_application_merge_mutation_or_authority",
  "tui_mediated_local_seat_loop_operational_readiness_tui_treated_as_action_authority",
  "repo_agent_outbox_report_expectation_profile_treated_as_agent_invocation_scheduler_or_dispatch",
  "repo_agent_outbox_report_expectation_profile_treated_as_report_import_or_result_intake",
  "repo_agent_outbox_report_expectation_profile_treated_as_acceptance_truth_or_payload",
  "repo_agent_outbox_report_expectation_profile_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_expectation_profile_treated_as_platform_authority_event_or_auto_execute",
  "repo_agent_outbox_report_expectation_profile_tui_treated_as_action_authority",
  "repo_agent_outbox_report_body_visibility_treated_as_result_intake_or_acceptance",
  "repo_agent_outbox_report_body_visibility_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_body_visibility_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_body_visibility_treated_as_dispatch_execution_agent_or_platform",
  "repo_agent_outbox_report_body_visibility_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_body_visibility_tui_treated_as_action_authority",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_result_intake_or_acceptance",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_dispatch_execution_agent_or_platform",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_expectation_sidecar_review_profile_tui_treated_as_action_authority",
  "repo_agent_outbox_report_compliance_board_projection_treated_as_result_intake_or_acceptance",
  "repo_agent_outbox_report_compliance_board_projection_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_compliance_board_projection_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_compliance_board_projection_treated_as_dispatch_execution_agent_or_platform",
  "repo_agent_outbox_report_compliance_board_projection_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_compliance_board_projection_tui_treated_as_action_authority",
  "repo_agent_outbox_report_result_intake_readiness_treated_as_candidate_or_intake",
  "repo_agent_outbox_report_result_intake_readiness_treated_as_acceptance_truth_or_payload",
  "repo_agent_outbox_report_result_intake_readiness_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_result_intake_readiness_treated_as_dispatch_execution_agent_or_platform",
  "repo_agent_outbox_report_result_intake_readiness_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_result_intake_readiness_tui_treated_as_action_authority",
  "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_import_intake_or_acceptance",
  "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_dispatch_execution_agent_or_platform",
  "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_authority_autonomy_enclosure_or_auto_execute",
  "repo_agent_outbox_report_expectation_compliance_measurement_tui_treated_as_action_authority",
  "repo_agent_outbox_report_repair_guidance_treated_as_import_intake_or_acceptance",
  "repo_agent_outbox_report_repair_guidance_treated_as_agent_invocation_or_dispatch",
  "repo_agent_outbox_report_repair_guidance_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_repair_guidance_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_repair_guidance_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_repair_guidance_tui_treated_as_action_authority",
  "repo_agent_outbox_report_repair_guidance_export_view_treated_as_delivery_invocation_or_dispatch",
  "repo_agent_outbox_report_repair_guidance_export_view_treated_as_import_intake_or_acceptance",
  "repo_agent_outbox_report_repair_guidance_export_view_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_repair_guidance_export_view_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_repair_guidance_export_view_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_repair_guidance_export_view_tui_treated_as_action_authority",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_delivery_invocation_or_dispatch",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_import_intake_or_acceptance",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_report_truth_or_payload",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_application_merge_mutation_or_storage",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_authority_event_auto_execute_or_enclosure",
  "repo_agent_outbox_report_repair_request_inbox_packet_candidate_tui_treated_as_action_authority",
  "repo_agent_seat_exchange_tui_treated_as_action_authority"
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
    caseId: "review_only_work_cell_result_acceptance_observation_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance observation treated as result application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_observation_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_observation_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell result acceptance observation treated as payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_observation_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_observation_treated_as_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance observation treated as Layer truth, Layer continuity, storage write, authority, or accepted continuity",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_observation_treated_as_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_result_acceptance_observation_treated_as_dispatch_execution_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell result acceptance observation treated as dispatch, execution, Platform consequence, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_result_acceptance_observation_treated_as_dispatch_execution_auto_execute"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_summary_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop summary treated as result application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:review_only_work_cell_loop_summary_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_summary_treated_as_payload_validity",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell loop summary treated as payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:review_only_work_cell_loop_summary_treated_as_payload_validity"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_summary_treated_as_authority_or_next_approval",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop summary treated as storage write, authority, accepted continuity, dispatch approval, or next-step approval",
    reasonCode: "blocked_case:review_only_work_cell_loop_summary_treated_as_authority_or_next_approval"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_summary_tui_treated_as_action_surface",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop summary cockpit/TUI projection treated as action controls, dispatch, execution, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_loop_summary_tui_treated_as_action_surface"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_field_trial_treated_as_general_enclosure_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop field trial treated as general Edge enclosure proof, authority, next-step approval, or readiness conversion",
    reasonCode: "blocked_case:review_only_work_cell_loop_field_trial_treated_as_general_enclosure_or_authority"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_field_trial_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop field trial treated as result application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:review_only_work_cell_loop_field_trial_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_field_trial_treated_as_payload_or_storage",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell loop field trial treated as payload validity, payload fetch, payload materialization, storage write, or accepted continuity",
    reasonCode: "blocked_case:review_only_work_cell_loop_field_trial_treated_as_payload_or_storage"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_field_trial_tui_treated_as_action_surface",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop field trial cockpit/TUI projection treated as action controls, scheduling, dispatch, execution, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_loop_field_trial_tui_treated_as_action_surface"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_repetition_batch_treated_as_wall_clock_or_general_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop repetition batch treated as wall-clock reduction, general Edge enclosure proof, autonomy, readiness conversion, or authority",
    reasonCode: "blocked_case:review_only_work_cell_loop_repetition_batch_treated_as_wall_clock_or_general_enclosure"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_repetition_batch_treated_as_scheduling_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop repetition batch treated as scheduling, launch, dispatch, execution, Platform call, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_loop_repetition_batch_treated_as_scheduling_dispatch_execution"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_repetition_batch_treated_as_application_merge_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop repetition batch treated as result application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:review_only_work_cell_loop_repetition_batch_treated_as_application_merge_mutation"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_repetition_batch_treated_as_payload_storage_authority",
    sourceFamily: "bytes",
    attemptedOverclaim: "Review-only work-cell loop repetition batch treated as payload validity, payload fetch, payload materialization, storage write, accepted continuity, or authority",
    reasonCode: "blocked_case:review_only_work_cell_loop_repetition_batch_treated_as_payload_storage_authority"
  }),
  Object.freeze({
    caseId: "review_only_work_cell_loop_repetition_batch_tui_treated_as_action_surface",
    sourceFamily: "edge",
    attemptedOverclaim: "Review-only work-cell loop repetition batch cockpit/TUI projection treated as action controls, scheduling, dispatch, execution, or auto-execute",
    reasonCode: "blocked_case:review_only_work_cell_loop_repetition_batch_tui_treated_as_action_surface"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_descriptor_treated_as_identity_or_admission",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat descriptor treated as identity authority, writer admission, reader admission, or mutation permission",
    reasonCode: "blocked_case:repo_agent_seat_descriptor_treated_as_identity_or_admission"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_readiness_treated_as_scheduling_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat readiness projection treated as scheduling permission, agent launch, work packet dispatch, execution, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_readiness_treated_as_scheduling_dispatch_execution"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_readiness_treated_as_result_truth_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat readiness projection treated as result acceptance, reported commit/test truth, result application, or merge",
    reasonCode: "blocked_case:repo_agent_seat_readiness_treated_as_result_truth_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_readiness_treated_as_repo_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat readiness projection treated as repo mutation, Layer mutation, storage write, authority, or repo-specific Layer API",
    reasonCode: "blocked_case:repo_agent_seat_readiness_treated_as_repo_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_tui_card_treated_as_action_surface",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat TUI read-only card treated as action controls, decision capture, scheduling, dispatch, execution, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_tui_card_treated_as_action_surface"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_treated_as_scheduling_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board treated as scheduling, launch, dispatch, execution, Platform call, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_treated_as_scheduling_dispatch_execution"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_treated_as_decision_capture_or_approval",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board treated as operator decision capture, approval, work-cell creation, or dispatch-decision-request creation",
    reasonCode: "blocked_case:repo_agent_operational_board_treated_as_decision_capture_or_approval"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_treated_as_result_acceptance_truth_application",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board treated as result acceptance, reported commit/test truth, result application, or merge",
    reasonCode: "blocked_case:repo_agent_operational_board_treated_as_result_acceptance_truth_application"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_treated_as_repo_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board treated as repo mutation, Layer mutation, storage write, accepted continuity, authority, or event-family expansion",
    reasonCode: "blocked_case:repo_agent_operational_board_treated_as_repo_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_tui_treated_as_action_surface",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board TUI projection treated as action controls, scheduling, dispatch, execution, decision capture, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_tui_treated_as_action_surface"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_field_use_report_treated_as_scheduling_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board field-use report treated as scheduling, launch, dispatch, execution, Platform call, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_field_use_report_treated_as_scheduling_dispatch_execution"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_field_use_report_treated_as_decision_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board field-use report treated as operator decision capture, approval, authority, or work-cell creation",
    reasonCode: "blocked_case:repo_agent_operational_board_field_use_report_treated_as_decision_or_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_field_use_report_treated_as_result_truth_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board field-use report treated as result acceptance, reported commit/test truth, application, merge, repo mutation, or Layer mutation",
    reasonCode: "blocked_case:repo_agent_operational_board_field_use_report_treated_as_result_truth_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_field_use_report_treated_as_general_enclosure_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent operational board field-use report treated as general enclosure, wall-clock automation proof, storage write, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_field_use_report_treated_as_general_enclosure_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_hardened_field_measurement_treated_as_scheduling_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Hardened board field-use measurement treated as scheduling, launch, dispatch, execution, Platform call, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_hardened_field_measurement_treated_as_scheduling_dispatch_execution"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_hardened_field_measurement_treated_as_decision_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Hardened board field-use measurement treated as decision capture, approval, work-cell creation, or authority",
    reasonCode: "blocked_case:repo_agent_operational_board_hardened_field_measurement_treated_as_decision_or_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_hardened_field_measurement_treated_as_result_truth_mutation_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Hardened board field-use measurement treated as result truth, result acceptance, application, merge, repo mutation, Layer mutation, storage write, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_hardened_field_measurement_treated_as_result_truth_mutation_or_auto_execute"
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
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_prompt_candidate_treated_as_prompt_delivery_or_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Operational board prompt candidate treated as prompt delivery, scheduling, agent launch, dispatch, or execution",
    reasonCode: "blocked_case:repo_agent_operational_board_prompt_candidate_treated_as_prompt_delivery_or_dispatch"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_prompt_candidate_treated_as_decision_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Operational board prompt candidate treated as operator decision capture, approval, or authority grant",
    reasonCode: "blocked_case:repo_agent_operational_board_prompt_candidate_treated_as_decision_or_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_operational_board_prompt_candidate_treated_as_result_truth_mutation_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Operational board prompt candidate treated as result truth, acceptance, application, merge, repo or Layer mutation, storage write, or auto-execute",
    reasonCode: "blocked_case:repo_agent_operational_board_prompt_candidate_treated_as_result_truth_mutation_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_convention_treated_as_transport_scheduler_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange convention treated as prompt transport, scheduler, dispatch, execution, authority, or RBC enforcement proof",
    reasonCode: "blocked_case:repo_agent_seat_exchange_convention_treated_as_transport_scheduler_or_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_packet_candidate_treated_as_delivery_invocation_or_work_cell",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox packet candidate treated as prompt delivery, inbox write, agent invocation, work-cell creation, or dispatch approval",
    reasonCode: "blocked_case:repo_agent_seat_inbox_packet_candidate_treated_as_delivery_invocation_or_work_cell"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_report_candidate_treated_as_import_acceptance_truth_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report candidate treated as report import, result acceptance, reported truth, application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_report_candidate_treated_as_import_acceptance_truth_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_decision_treated_as_handoff_attempt",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff operator decision treated as the local inbox handoff attempt itself",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_decision_treated_as_handoff_attempt"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_decision_treated_as_delivery_dispatch_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff operator decision treated as prompt delivery, inbox write, dispatch, scheduling, launch, invocation, or execution",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_decision_treated_as_delivery_dispatch_execution"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_decision_treated_as_result_import_acceptance_truth",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff operator decision treated as outbox import, result intake, result acceptance, application, merge, or reported-result truth",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_decision_treated_as_result_import_acceptance_truth"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_decision_treated_as_repo_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff operator decision treated as repo mutation, Layer mutation, storage write, Platform consequence, authority, accepted continuity, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_decision_treated_as_repo_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_observation_treated_as_implicit_path_or_repo_discovery",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff observation treated as default cwd, repo discovery, implicit path, missing destination, unsafe path, or multi-packet handoff",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_observation_treated_as_implicit_path_or_repo_discovery"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_observation_treated_as_shell_network_or_agent_invocation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff observation treated as shell use, network use, agent launch, agent invocation, or scheduler behavior",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_observation_treated_as_shell_network_or_agent_invocation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_observation_treated_as_dispatch_execution_or_work_cell",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff observation treated as dispatch, execution, work-cell creation, or dispatch-decision request creation",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_observation_treated_as_dispatch_execution_or_work_cell"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_observation_treated_as_result_import_acceptance_truth",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff observation treated as outbox import, result intake, result acceptance, application, merge, or reported-result truth",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_observation_treated_as_result_import_acceptance_truth"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_observation_treated_as_repo_layer_storage_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff observation treated as broad repo mutation, Layer mutation, storage write, Platform consequence, authority, accepted continuity, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_observation_treated_as_repo_layer_storage_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_decision_treated_as_import_or_result_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox import operator decision treated as outbox report import, outbox import observation/result, or result intake",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_decision_treated_as_import_or_result_intake"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_decision_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox import operator decision treated as result acceptance, reported truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_decision_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_decision_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox import operator decision treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_decision_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_decision_treated_as_dispatch_execution_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox import operator decision treated as scheduling, launch, dispatch, execution, agent invocation, Platform call, host-local consequence, or activation",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_decision_treated_as_dispatch_execution_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_decision_treated_as_authority_event_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox import operator decision treated as authority transition, accepted continuity, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_decision_treated_as_authority_event_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_inbox_handoff_receipt_treated_as_delivery_read_or_execution_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat inbox handoff receipt treated as delivery proof, agent read proof, or execution proof",
    reasonCode: "blocked_case:repo_agent_seat_inbox_handoff_receipt_treated_as_delivery_read_or_execution_proof"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_implicit_path_or_repo_discovery",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as default cwd, repo discovery, implicit path, missing explicit path, or multi-report import",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_implicit_path_or_repo_discovery"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_shell_network_or_agent_invocation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as shell use, network use, agent launch, agent invocation, scheduler, dispatch, or execution",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_shell_network_or_agent_invocation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_result_intake_acceptance_truth",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as result intake, result acceptance, reported result truth, or parsed report truth",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_result_intake_acceptance_truth"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_payload_validity_or_materialization",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as payload validity, payload fetch, payload materialization, or Bytes material truth",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_payload_validity_or_materialization"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_import_observation_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report import observation treated as dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_outbox_import_observation_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_candidate_treated_as_result_intake_or_decision",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake candidate treated as performed result intake, result-intake operator decision, or approval",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_candidate_treated_as_result_intake_or_decision"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_candidate_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake candidate treated as result acceptance, reported truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_candidate_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_candidate_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake candidate treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_candidate_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_candidate_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake candidate treated as scheduling, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_candidate_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_decision_treated_as_intake_or_observation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake operator decision treated as performed result intake, result-intake observation/result, or result-intake receipt",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_decision_treated_as_intake_or_observation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_decision_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake operator decision treated as result acceptance, reported truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_decision_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_decision_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake operator decision treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_decision_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_decision_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake operator decision treated as scheduling, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_decision_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_observation_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake observation/result treated as result acceptance, reported truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_observation_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_observation_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake observation/result treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_observation_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_outbox_result_intake_observation_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat outbox report result-intake observation/result treated as scheduling, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_outbox_result_intake_observation_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_summary_treated_as_delivery_read_or_execution_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop summary treated as delivery proof, agent read proof, execution proof, or work success proof",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_summary_treated_as_delivery_read_or_execution_proof"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_summary_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop summary treated as result acceptance, reported-result truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_summary_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_summary_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop summary treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_summary_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_summary_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop summary treated as scheduling, agent launch, dispatch, execution, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_summary_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_board_tui_burden_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop board, TUI, or burden measurement treated as action controls, decision capture, dispatch, result acceptance, mutation, or authority",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_board_tui_burden_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_treated_as_handoff_import_or_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop burden measurement treated as inbox handoff, outbox import, result intake, or new exchange mechanic",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_treated_as_handoff_import_or_intake"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop burden measurement treated as result acceptance, reported-result truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop burden measurement treated as result application, merge, repo mutation, Layer mutation, Layer truth, Layer continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop burden measurement treated as scheduling, agent launch, dispatch, execution, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "Task-count reduction in repo-agent seat exchange loop burden measurement treated as wall-clock proof, autonomy proof, full Edge enclosure proof, delivery proof, or agent correctness proof",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_loop_burden_measurement_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange loop burden measurement TUI or cockpit visibility treated as action controls, decision capture, dispatch, import, result acceptance, mutation, or authority",
    reasonCode: "blocked_case:repo_agent_seat_exchange_loop_burden_measurement_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_treated_as_scheduler_runner_or_workflow",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle treated as scheduler, runner, workflow execution, or automatic loop progression",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_treated_as_scheduler_runner_or_workflow"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_treated_as_decision_or_handoff",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle treated as operator decision creation/capture, inbox handoff, inbox write, or prompt delivery",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_treated_as_decision_or_handoff"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle treated as outbox import, result intake, result acceptance, or reported-result truth",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_treated_as_payload_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle treated as payload validity/fetch/materialization, application, merge, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_treated_as_payload_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle treated as scheduling, launch, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_points_treated_as_approval_or_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "Pending mediation point treated as approval, or completed mediation point treated as delivery, read, or execution proof",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_points_treated_as_approval_or_proof"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_bundle_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation bundle TUI or cockpit visibility treated as action controls, decision capture, handoff, import, dispatch, result acceptance, mutation, or authority",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_bundle_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_treated_as_operator_decision",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection treated as operator decision creation, capture, recording, approval, or readiness conversion",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_treated_as_operator_decision"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_treated_as_handoff_import_or_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection treated as inbox handoff, inbox write, outbox import, or result intake",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_treated_as_handoff_import_or_intake"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection treated as result acceptance, report truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection treated as result application, merge, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection treated as scheduling, launch, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_mediation_decision_projection_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange mediation decision candidate projection TUI or cockpit visibility treated as action controls, decision capture, handoff, import, dispatch, result acceptance, mutation, or authority",
    reasonCode: "blocked_case:repo_agent_seat_exchange_mediation_decision_projection_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_treated_as_handoff_attempt",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture treated as the local inbox handoff attempt itself",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_treated_as_handoff_attempt"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_treated_as_delivery_or_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture treated as prompt delivery, inbox write, scheduling, launch, dispatch, agent invocation, or execution",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_treated_as_delivery_or_execution"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture treated as outbox import, result intake, result acceptance, result truth, application, or merge",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_treated_as_payload_application_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture treated as payload validity/fetch/materialization, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_treated_as_payload_application_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_treated_as_authority_event_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture treated as Platform consequence, authority transition, accepted continuity, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_treated_as_authority_event_or_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_inbox_handoff_decision_capture_visibility_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI inbox handoff decision capture visibility treated as post-capture action controls, handoff/import/dispatch controls, mutation, or authority",
    reasonCode: "blocked_case:tui_inbox_handoff_decision_capture_visibility_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_treated_as_outbox_import",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture treated as outbox report read/import or import observation/result creation",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_treated_as_outbox_import"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_treated_as_result_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture treated as result intake, result acceptance, reported result truth, application, or merge",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_treated_as_result_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_treated_as_payload_application_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture treated as payload validity/fetch/materialization, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_treated_as_payload_application_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture treated as scheduling, launch, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_receipt_treated_as_delivery_read_or_execution_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture treated as inbox handoff delivery proof, agent read proof, or execution proof",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_receipt_treated_as_delivery_read_or_execution_proof"
  }),
  Object.freeze({
    caseId: "tui_outbox_import_decision_capture_visibility_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox import decision capture visibility treated as post-capture action controls, import/result-intake/dispatch controls, mutation, or authority",
    reasonCode: "blocked_case:tui_outbox_import_decision_capture_visibility_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_outbox_result_intake_decision_capture_treated_as_result_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox result-intake decision capture treated as result-intake attempt or result-intake observation/result creation",
    reasonCode: "blocked_case:tui_outbox_result_intake_decision_capture_treated_as_result_intake"
  }),
  Object.freeze({
    caseId: "tui_outbox_result_intake_decision_capture_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox result-intake decision capture treated as result acceptance, reported result truth, payload validity, fetch, or materialization",
    reasonCode: "blocked_case:tui_outbox_result_intake_decision_capture_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_outbox_result_intake_decision_capture_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox result-intake decision capture treated as result application, merge, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:tui_outbox_result_intake_decision_capture_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_outbox_result_intake_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox result-intake decision capture treated as scheduling, launch, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_outbox_result_intake_decision_capture_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_outbox_result_intake_decision_capture_visibility_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI outbox result-intake decision capture visibility treated as post-capture action controls, result-intake/acceptance/dispatch controls, mutation, or authority",
    reasonCode: "blocked_case:tui_outbox_result_intake_decision_capture_visibility_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_treated_as_handoff_import_or_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop burden measurement treated as inbox handoff, outbox import, result intake, or new loop mechanic",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_treated_as_handoff_import_or_intake"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop burden measurement treated as result acceptance, reported-result truth, payload validity, payload fetch, or payload materialization",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_treated_as_application_merge_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop burden measurement treated as result application, merge, repo mutation, Layer mutation/truth/continuity, or storage write",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_treated_as_application_merge_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop burden measurement treated as scheduling, launch, dispatch, execution, agent invocation, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_treated_as_dispatch_platform_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "Task-count reduction in TUI-mediated seat-loop burden measurement treated as wall-clock proof, autonomy proof, full Edge enclosure proof, delivery proof, or agent correctness proof",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_decision_capture_treated_as_action_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop decision capture treated as handoff, import, result intake, dispatch, execution, mutation, or authority action",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_decision_capture_treated_as_action_execution"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_burden_measurement_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop burden measurement cockpit visibility treated as action controls, decision authority, dispatch, import, result acceptance, mutation, or authority",
    reasonCode: "blocked_case:tui_mediated_seat_loop_burden_measurement_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_decision_or_action",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop remaining burden analysis treated as operator decision creation/capture, handoff, import, result intake, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_mediated_seat_loop_remaining_burden_analysis_treated_as_decision_or_action"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_remaining_burden_analysis_treated_as_acceptance_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop remaining burden analysis treated as result acceptance, truth, payload validity, application, merge, repo/Layer/storage mutation, or authority",
    reasonCode: "blocked_case:tui_mediated_seat_loop_remaining_burden_analysis_treated_as_acceptance_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_seat_loop_remaining_burden_analysis_recommendation_treated_as_approval",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated seat-loop remaining burden recommendation treated as approval, readiness, auto-continuation, auto-execute, or TUI action authority",
    reasonCode: "blocked_case:tui_mediated_seat_loop_remaining_burden_analysis_recommendation_treated_as_approval"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_hardening_treated_as_handoff_import_or_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility hardening treated as inbox handoff, outbox import, result intake, scheduling, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_receipt_visibility_hardening_treated_as_handoff_import_or_intake"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_hardening_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility hardening treated as result acceptance, reported truth, payload validity, payload fetch/materialization, application, merge, repo/Layer/storage mutation, or authority",
    reasonCode: "blocked_case:tui_receipt_visibility_hardening_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_hardening_treated_as_action_authority_or_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility hardening panels or recommendations treated as action controls, approvals, delivery/read/execution proof, authority, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_receipt_visibility_hardening_treated_as_action_authority_or_proof"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_next_posture_panel_treated_as_decision_or_action",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility next-posture panel treated as operator decision creation/capture, inbox handoff, outbox import, result intake, scheduling, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_receipt_visibility_next_posture_panel_treated_as_decision_or_action"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_next_posture_panel_treated_as_acceptance_truth_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility next-posture panel treated as result acceptance, reported truth, payload validity/fetch/materialization, application, merge, repo/Layer/storage mutation, or accepted continuity",
    reasonCode: "blocked_case:tui_receipt_visibility_next_posture_panel_treated_as_acceptance_truth_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_receipt_visibility_next_posture_panel_treated_as_approval_authority_or_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt visibility next-posture panel recommendation, decision projection, or receipt refs treated as approval, authority, delivery/read/execution proof, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_receipt_visibility_next_posture_panel_treated_as_approval_authority_or_proof"
  }),
  Object.freeze({
    caseId: "tui_receipt_action_candidate_projection_treated_as_action_or_receipt",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt action candidate projection treated as performing inbox handoff, outbox import, result intake, creating receipt observation/result, scheduling, dispatch, execution, or invoking an agent",
    reasonCode: "blocked_case:tui_receipt_action_candidate_projection_treated_as_action_or_receipt"
  }),
  Object.freeze({
    caseId: "tui_receipt_action_candidate_projection_treated_as_acceptance_truth_or_mutation",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt action candidate projection treated as result acceptance, reported truth, payload validity/fetch/materialization, application, merge, repo/Layer/storage mutation, or accepted continuity",
    reasonCode: "blocked_case:tui_receipt_action_candidate_projection_treated_as_acceptance_truth_or_mutation"
  }),
  Object.freeze({
    caseId: "tui_receipt_action_candidate_projection_treated_as_approval_authority_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI receipt action candidate projection treated as approval, action authority, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_receipt_action_candidate_projection_treated_as_approval_authority_or_auto_execute"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_treated_as_scheduler_dispatch_or_agent_execution",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt-producing action treated as scheduler, dispatch, agent invocation, execution, Platform call, or future authorization",
    reasonCode: "blocked_case:tui_triggered_receipt_action_treated_as_scheduler_dispatch_or_agent_execution"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt-producing action receipt treated as result acceptance, reported truth, payload validity/fetch/materialization, or Layer truth",
    reasonCode: "blocked_case:tui_triggered_receipt_action_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_treated_as_application_merge_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt-producing action treated as result application, merge, repo mutation beyond explicit inbox copy, Layer mutation, storage write, authority, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_triggered_receipt_action_treated_as_application_merge_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_burden_measurement_treated_as_action_or_receipt",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt action burden measurement treated as performing a receipt action, creating a receipt observation/result, handoff, import, result intake, scheduling, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_triggered_receipt_action_burden_measurement_treated_as_action_or_receipt"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_burden_measurement_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt action burden measurement treated as result acceptance, reported truth, receipt truth, payload validity/fetch/materialization, or Layer truth",
    reasonCode: "blocked_case:tui_triggered_receipt_action_burden_measurement_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_burden_measurement_treated_as_application_merge_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt action burden measurement treated as result application, merge, repo mutation, Layer mutation, storage write, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_triggered_receipt_action_burden_measurement_treated_as_application_merge_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt action burden task-count measurement treated as wall-clock savings, autonomy proof, full Edge enclosure proof, agent correctness proof, delivery proof, read proof, or execution proof",
    reasonCode: "blocked_case:tui_triggered_receipt_action_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  }),
  Object.freeze({
    caseId: "tui_triggered_receipt_action_burden_measurement_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-triggered receipt action burden measurement visibility treated as approval, action authority, receipt authority, dispatch authority, or auto-execute authority",
    reasonCode: "blocked_case:tui_triggered_receipt_action_burden_measurement_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_treated_as_action_or_receipt",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary treated as performing an action, creating a receipt, creating/capturing an operator decision, scheduling, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_treated_as_action_or_receipt"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary treated as result acceptance, reported truth, receipt truth, payload validity/fetch/materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_treated_as_application_merge_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary treated as result application, merge, repo mutation, Layer mutation, storage write, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_treated_as_application_merge_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_treated_as_delivery_read_execution_or_enclosure_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary treated as delivery proof, agent read proof, execution proof, wall-clock proof, autonomy proof, full Edge enclosure proof, or agent correctness proof",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_treated_as_delivery_read_execution_or_enclosure_proof"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary visibility treated as approval, action authority, receipt authority, dispatch authority, or auto-execute authority",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_action_or_receipt",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary burden measurement treated as performing an action, creating a receipt observation/result, creating/capturing an operator decision, scheduling, dispatch, execution, or agent invocation",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_action_or_receipt"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary burden measurement treated as result acceptance, reported truth, receipt truth, payload validity/fetch/materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_application_merge_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary burden measurement treated as result application, merge, repo mutation, Layer mutation, storage write, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_application_merge_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary burden task-count measurement treated as wall-clock savings, autonomy proof, full Edge enclosure proof, agent correctness proof, delivery proof, read proof, or execution proof",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_burden_measurement_treated_as_wall_clock_autonomy_or_enclosure_proof"
  }),
  Object.freeze({
    caseId: "tui_mediated_receipt_action_loop_summary_burden_measurement_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated receipt action loop summary burden measurement visibility treated as approval, action authority, receipt authority, dispatch authority, or auto-execute authority",
    reasonCode: "blocked_case:tui_mediated_receipt_action_loop_summary_burden_measurement_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_local_seat_loop_operational_readiness_treated_as_enclosure_or_autonomy_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated local seat-loop operational readiness treated as full Edge enclosure proof, autonomy proof, agent correctness proof, wall-clock proof, or default external agent control",
    reasonCode: "blocked_case:tui_mediated_local_seat_loop_operational_readiness_treated_as_enclosure_or_autonomy_proof"
  }),
  Object.freeze({
    caseId: "tui_mediated_local_seat_loop_operational_readiness_treated_as_dispatch_execution_or_delivery_proof",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated local seat-loop operational readiness treated as dispatch proof, execution proof, delivery proof, read proof, agent invocation, scheduler, or runner",
    reasonCode: "blocked_case:tui_mediated_local_seat_loop_operational_readiness_treated_as_dispatch_execution_or_delivery_proof"
  }),
  Object.freeze({
    caseId: "tui_mediated_local_seat_loop_operational_readiness_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated local seat-loop operational readiness treated as result acceptance, reported truth, payload validity/fetch/materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:tui_mediated_local_seat_loop_operational_readiness_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "tui_mediated_local_seat_loop_operational_readiness_treated_as_application_merge_mutation_or_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated local seat-loop operational readiness treated as result application, merge, repo mutation, Layer mutation, storage write, Platform consequence, authority transition, event-family expansion, or auto-execute",
    reasonCode: "blocked_case:tui_mediated_local_seat_loop_operational_readiness_treated_as_application_merge_mutation_or_authority"
  }),
  Object.freeze({
    caseId: "tui_mediated_local_seat_loop_operational_readiness_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "TUI-mediated local seat-loop operational readiness visibility treated as action authority, decision authority, dispatch authority, execution authority, import authority, mutation authority, or approval",
    reasonCode: "blocked_case:tui_mediated_local_seat_loop_operational_readiness_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_treated_as_agent_invocation_scheduler_or_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile treated as agent invocation, scheduler, watcher, dispatch, launch, or execution behavior",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_treated_as_agent_invocation_scheduler_or_dispatch"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_treated_as_report_import_or_result_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile treated as outbox report import, report truth validation, or result-intake creation",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_treated_as_report_import_or_result_intake"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile treated as result acceptance, reported truth, payload validity/fetch/materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_treated_as_platform_authority_event_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile treated as Platform consequence, authority transition, event-family expansion, auto-execute, full Edge enclosure proof, or agent correctness proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_treated_as_platform_authority_event_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_profile_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation profile TUI visibility treated as import, decision, dispatch, execution, mutation, acceptance, or action authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_profile_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_treated_as_result_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility treated as result-intake creation, result-intake performance, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_treated_as_result_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility treated as report truth, body truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_treated_as_dispatch_execution_agent_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility treated as dispatch, scheduling, launch, execution, repo-agent invocation, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_treated_as_dispatch_execution_agent_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, or autonomy proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_body_visibility_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report body visibility TUI visibility treated as action authority, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_body_visibility_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_result_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile treated as result-intake creation, result acceptance, report acceptance, or operator decision capture",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_result_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile treated as report truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_dispatch_execution_agent_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile treated as dispatch, scheduling, launch, execution, repo-agent invocation, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_dispatch_execution_agent_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, or autonomy proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_sidecar_review_profile_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation sidecar review profile TUI visibility treated as action authority, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_sidecar_review_profile_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_treated_as_result_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection treated as result-intake creation, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_treated_as_result_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection treated as report truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_treated_as_dispatch_execution_agent_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection treated as dispatch, scheduling, launch, execution, repo-agent invocation, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_treated_as_dispatch_execution_agent_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, or autonomy proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_compliance_board_projection_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report compliance board projection TUI visibility treated as action authority, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_compliance_board_projection_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_treated_as_candidate_or_intake",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness treated as result-intake candidate creation, result-intake operator decision creation, result-intake creation, result-intake performance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_treated_as_candidate_or_intake"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_treated_as_acceptance_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness treated as result acceptance, report truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_treated_as_acceptance_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_treated_as_dispatch_execution_agent_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness treated as dispatch, scheduling, launch, execution, repo-agent invocation, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_treated_as_dispatch_execution_agent_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, or autonomy proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_result_intake_readiness_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report result-intake readiness TUI visibility treated as action authority, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_result_intake_readiness_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement treated as report import, result-intake creation, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement treated as report truth, report body truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_dispatch_execution_agent_or_platform",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement treated as dispatch, scheduling, launch, execution, repo-agent invocation, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_treated_as_dispatch_execution_agent_or_platform"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_treated_as_authority_autonomy_enclosure_or_auto_execute",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, autonomy proof, wall-clock proof, or agent correctness proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_treated_as_authority_autonomy_enclosure_or_auto_execute"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_expectation_compliance_measurement_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report expectation compliance measurement TUI visibility treated as action authority, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_expectation_compliance_measurement_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance treated as report import, result-intake creation, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_treated_as_agent_invocation_or_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance treated as prompt delivery, repo-agent invocation, scheduling, launch, dispatch, execution, watcher behavior, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_treated_as_agent_invocation_or_dispatch"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance treated as report truth, report body truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, autonomy proof, or wall-clock proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance TUI visibility treated as action authority, repair request execution, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_treated_as_delivery_invocation_or_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view treated as repair request delivery, prompt delivery, repo-agent invocation, scheduling, launch, dispatch, execution, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_treated_as_delivery_invocation_or_dispatch"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view treated as report import, result-intake creation, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view treated as report truth, report body truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, autonomy proof, or wall-clock proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_guidance_export_view_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair guidance export view TUI visibility treated as action authority, delivery authority, repair request execution, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_guidance_export_view_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_delivery_invocation_or_dispatch",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate treated as repair request delivery, prompt delivery, inbox write, repo-agent invocation, scheduling, launch, dispatch, execution, Platform call, or host-local consequence",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_delivery_invocation_or_dispatch"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_import_intake_or_acceptance",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate treated as outbox read, report import, result-intake creation, result acceptance, report acceptance, operator decision capture, or approval",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_import_intake_or_acceptance"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_report_truth_or_payload",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate treated as report truth, report body truth, agent correctness proof, payload validity, payload fetch, payload materialization, Layer truth, or Layer continuity",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_report_truth_or_payload"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_application_merge_mutation_or_storage",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate treated as result application, merge, repo mutation, Layer mutation, or storage write",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_application_merge_mutation_or_storage"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_authority_event_auto_execute_or_enclosure",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate treated as authority transition, accepted continuity, event-family expansion, auto-execute, full Edge enclosure proof, autonomy proof, or wall-clock proof",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_treated_as_authority_event_auto_execute_or_enclosure"
  }),
  Object.freeze({
    caseId: "repo_agent_outbox_report_repair_request_inbox_packet_candidate_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent outbox report repair request inbox packet candidate TUI visibility treated as action authority, delivery authority, repair request execution, inbox write, result-intake authority, acceptance authority, mutation authority, dispatch authority, or execution authority",
    reasonCode: "blocked_case:repo_agent_outbox_report_repair_request_inbox_packet_candidate_tui_treated_as_action_authority"
  }),
  Object.freeze({
    caseId: "repo_agent_seat_exchange_tui_treated_as_action_authority",
    sourceFamily: "edge",
    attemptedOverclaim: "Repo-agent seat exchange TUI visibility treated as send, dispatch, import, decision, mutation, or action authority",
    reasonCode: "blocked_case:repo_agent_seat_exchange_tui_treated_as_action_authority"
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
