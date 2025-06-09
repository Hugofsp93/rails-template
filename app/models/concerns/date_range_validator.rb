class DateRangeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank? && options[:allow_nil]

    min_date = options[:min] || Date.new(1700, 1, 1)
    max_date = options[:max] || Date.new(2200, 12, 31)

    if value.present?
      begin
        date_value = value.is_a?(Date) ? value : value.to_date

        if date_value < min_date
          record.errors.add(attribute, "must be after #{min_date.strftime('%Y-%m-%d')}")
        elsif date_value > max_date
          record.errors.add(attribute, "must be before #{max_date.strftime('%Y-%m-%d')}")
        end
      rescue ArgumentError, TypeError
        record.errors.add(attribute, "must be a valid date")
      end
    end
  end
end
