function buildUpdateQuery(
  table: string,
  args: { [key: string]: any },
  where: string,
  unique = 'id',
) {
  let query = '';
  let index = 1;
  Object.keys(args).forEach((key) => {
    if (args[key] || typeof args[key] === 'boolean' || args[key] === null) {
      if (key === unique) {
        return;
      }
      query += `${key} = $${index},`;
      index++;
    }
  });
  const values = Object.values(args).filter((value) => value !== undefined);
  return {
    query: `UPDATE "${table}" SET ${query.slice(0, -1)} WHERE ${unique as string
      } = $${values.length + 1} RETURNING * `,
    values: [...values, where],
  };
}

export { buildUpdateQuery };
