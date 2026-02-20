import { supabase } from './supabase';

export async function fetchChildren(parentId) {
  const today = new Date().toISOString().split('T')[0];

  const { data: children, error } = await supabase
    .from('children')
    .select(`
      *,
      devices (id, device_name, platform, last_seen, is_online),
      app_usage (app_name, app_icon, usage_minutes, usage_date),
      rules (id, type, label, value, enabled)
    `)
    .eq('parent_id', parentId)
    .eq('app_usage.usage_date', today)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return children || [];
}

export async function addChild(parentId, { name, age, avatar }) {
  const { data, error } = await supabase
    .from('children')
    .insert({ parent_id: parentId, name, age, avatar })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchNotifications(parentId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data || [];
}

export async function markNotificationsRead(parentId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('parent_id', parentId)
    .eq('read', false);
  if (error) throw error;
}

export async function updateRule(ruleId, updates) {
  const { error } = await supabase
    .from('rules')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', ruleId);
  if (error) throw error;
}

export async function fetchParent(userId) {
  const { data, error } = await supabase
    .from('parents')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
