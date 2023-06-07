const mapping: Record<string, string> = {
  brands: 'brand',
  campaigns: 'campaign',
  newsletters: 'newsletter',
  products: 'product',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
