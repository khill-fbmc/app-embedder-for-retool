<Form.Select
  value={app}
  disabled={isLoading}
  onChange={(e) => setApp(e.target.value as Environment)}
>
  {isLoading ? (
    <option value="loading">Fetching...</option>
  ) : (
    appList?.map((appName) => (
      <option
        key={appName}
        value={appName}
      >
        {appName}
      </option>
    ))
  )}
</Form.Select>;
