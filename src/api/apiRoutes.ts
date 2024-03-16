export const apiRoutes = {
	fact: (): string => 'https://catfact.ninja/fact',
	age: (name: string): string => `https://api.agify.io/?name=${name}`,
};
