export const validatePhone = (phone: string) => {
    let regex =
      /^(\+7)?[\s]?\(?[489][0-9]{2}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/;
    return regex.test(phone);
};