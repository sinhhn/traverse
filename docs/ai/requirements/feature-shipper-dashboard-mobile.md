---
phase: requirements
title: "Shipper Dashboard Mobile"
description: Mobile dashboard for shippers to track quote requests and order status
feature: shipper-dashboard-mobile
---

# Requirements

## Problem Statement
Shippers who submit quote requests have no way to track their status. They need a dashboard to see pending/responded/completed requests at a glance.

## Goals
- Shipper can view all their quote requests with status (依頼中/回答待ち/完了)
- Shipper can see which companies responded
- Shipper can navigate to response details
- UI consistent with existing SP design patterns

## Non-goals
- Real authentication (mock user: 田中花子)
- Real-time updates (static dummy data)
- Company-side dashboard

## User Stories
- As a shipper, I want to see my quote requests grouped by status so I know what needs attention
- As a shipper, I want to see which companies have responded so I can review their quotes
- As a shipper, I want to re-submit expired requests easily
- As a shipper, I want to see my favorite companies for quick access

## Success Criteria
- Dashboard renders at /sp/dashboard matching design in UI Design/shipper_dashboard_mobile/
- 3 tabs work: 依頼中 / 回答待ち / 完了
- Cards show correct status badges and company tags
- Navigation integrates with existing SP BottomTabBar
