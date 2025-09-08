import { Organization, OrganizationApi } from "@/types/Organization";

export const toOrganization = (o: OrganizationApi): Organization => ({
  createdAt: o.created_at,
  address: o.address,
  adminId: o.admin_id,
  id: o.id,
  name: o.name,
  place: o.lat && o.lng ? { lat: o.lat, lng: o.lng } : null,
  maxMeterRegistrations: o.max_meter_registrations,
  maxUsersActive: o.max_users_active,
});

export const toOrganizationApi = (o: Organization): OrganizationApi => ({
  created_at: o.createdAt,
  address: o.address,
  admin_id: o.adminId,
  id: o.id,
  name: o.name,
  lat: o.place?.lat || null,
  lng: o.place?.lng || null,
  max_meter_registrations: o.maxMeterRegistrations,
  max_users_active: o.maxUsersActive,
});
