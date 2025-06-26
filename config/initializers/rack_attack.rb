class Rack::Attack
  # Use Redis for storing rate limit data in production
  # Rack::Attack.cache.store = ActiveSupport::Cache::RedisCacheStore.new(url: ENV["REDIS_URL"])

  # Use memory store for tests to ensure rate limiting works
  if Rails.env.test?
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
  end

  # Rate limiting for authentication endpoints
  throttle("auth/sign_in", limit: 5, period: 1.minute) do |req|
    if req.path == "/api/v1/auth/sign_in" && req.post?
      # Use IP address as key
      req.ip
    end
  end

  throttle("auth/sign_up", limit: 3, period: 1.hour) do |req|
    if req.path == "/api/v1/auth/sign_up" && req.post?
      req.ip
    end
  end

  throttle("auth/password_reset", limit: 3, period: 1.hour) do |req|
    if req.path == "/api/v1/auth/password" && req.post?
      req.ip
    end
  end

  throttle("auth/confirmation", limit: 5, period: 1.hour) do |req|
    if req.path == "/api/v1/auth/confirmation" && req.post?
      req.ip
    end
  end

  # Rate limiting for web authentication endpoints
  throttle("web/sign_in", limit: 5, period: 1.minute) do |req|
    if req.path == "/users/sign_in" && req.post?
      req.ip
    end
  end

  throttle("web/sign_up", limit: 3, period: 1.hour) do |req|
    if req.path == "/users" && req.post?
      req.ip
    end
  end

  throttle("web/password_reset", limit: 3, period: 1.hour) do |req|
    if req.path == "/users/password" && req.post?
      req.ip
    end
  end

  # General API rate limiting
  throttle("api/requests", limit: 100, period: 1.minute) do |req|
    if req.path.start_with?("/api/")
      req.ip
    end
  end

  # Block suspicious requests
  blocklist("block suspicious requests") do |req|
    # Block requests with suspicious user agents
    suspicious_agents = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i
    ]

    suspicious_agents.any? { |pattern| req.user_agent&.match?(pattern) }
  end

  # Custom response for rate limited requests
  self.throttled_responder = lambda do |env|
    [
      429,
      { "Content-Type" => "application/json", "Retry-After" => "60" },
      [ { error: "Rate limit exceeded. Please try again later.", retry_after: 60 }.to_json ]
    ]
  end

  # Custom response for blocked requests
  self.blocklisted_responder = lambda do |env|
    [
      403,
      { "Content-Type" => "application/json" },
      [ { error: "Access denied" }.to_json ]
    ]
  end
end
